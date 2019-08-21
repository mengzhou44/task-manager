const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { executeInTransaction } = require("../data");
const User = require("../data/User");
const EmailVerification = require("../data/email-verification");
const { createAvatar } = require("../utils/create-avatar");
const { uploadImage } = require("../utils/image-repository");

class UserBl {
  constructor(trx) {
    this.trx = trx;
  }

  async _generateAuthToken(user) {
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    let tokens;
    if (user.tokens === undefined) {
      tokens = token;
    } else {
      tokens = user.tokens + "," + token;
    }

    await User.query(this.trx)
      .update({ tokens })
      .where({ id: user.id });

    return token;
  }

  async _findByCredentials({ email, password }) {
    const found = await User.query(this.trx).findOne({ email });
    if (found) {
      const isMatch = await bcrypt.compare(password, found.password);
      if (isMatch === true) {
        return found;
      }
    }
    return null;
  }

  _removeSensitive(user) {
    delete user.tokens;
  }

  async socialSignUp(user) {
    return await executeInTransaction(this, async () => {
      const found = await this.findByEmail(user.email);
      if (found !== null) {
        throw new Error("Email already exists!");
      }
      const inserted = await User.query(this.trx)
        .allowInsert("[firstName, lastName,  email,  phone, locale, picture]")
        .insert(user);

      const token = await this._generateAuthToken(inserted);
      this._removeSensitive(inserted);

      return { token, user: inserted };
    });
  }

  async signUp({ email, password, firstName, lastName, phone, image }) {
    return executeInTransaction(this, async () => {
      let hashed = await bcrypt.hash(password, 8);

      const user = await this.findByEmail(email);
      if (user !== null) {
        throw new Error("sign up failed - email already exists!");
      }

      const emailVerification = await EmailVerification.query(this.trx).findOne(
        { email }
      );
      if (emailVerification === undefined) {
        throw new Error("sign up failed - email verification is not found!");
      }

      if (emailVerification.verified === false) {
        throw new Error("sign up failed - email is not verified!");
      }
       
      await EmailVerification.query(this.trx)
        .delete()
        .where({ email });

      if (image === undefined) {
        image = {
          data: createAvatar(`${firstName} ${lastName}`, 500).toString(
            "base64"
          ),
          type: "png"
        };
      }

      const imageUrl = await uploadImage(image);

      const inserted = await User.query(this.trx).insert({
        firstName,
        lastName,
        email,
        password: hashed,
        phone,
        picture: imageUrl
      });

      const token = await this._generateAuthToken(inserted);

      this._removeSensitive(inserted);

      return { token, user: inserted };
    });
  }

  async signIn({ email, password }) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user === null) {
        throw new Error("sign in failed.");
      }
      const isPasswordMatch = await bcrypt
        .compare(password, user.password)
        .catch(() => false);

      if (isPasswordMatch === false) {
        throw new Error("sign in failed - invalid password!");
      }

      const token = await this._generateAuthToken(user);

      this._removeSensitive(user);

      return { token, user };
    });
  }

  async socialSignIn(email) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user === null) {
        throw new Error("sign in failed.");
      }
      const token = await this._generateAuthToken(user);

      this._removeSensitive(user);

      return { token, user };
    });
  }

  async signOut(user, token) {
    const found = await User.query(this.trx).findOne({ id: user.id });
    const temp = found.tokens.split(",");

    const tokens = _.filter(temp, item => item !== token).join(",");

    await User.query(this.trx)
      .update({ tokens })
      .where({ id: user.id });
  }

  async findByIdAndToken(id, token) {
    const found = await User.query(this.trx).findOne({ id });
    if (found === undefined) {
      return null;
    }

    const tokens = found.tokens.split(",");
    if (tokens.includes(token) === false) {
      throw new Error();
    }

    await this._removeSensitive(found);
    return found;
  }

  async findByEmail(email) {
    const found = await User.query(this.trx).findOne({ email });
    if (found === undefined) {
      return null;
    }
    return found;
  }
}

module.exports = UserBl;
