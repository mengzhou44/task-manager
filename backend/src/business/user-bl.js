const jwt = require("jsonwebtoken");
const axios = require('axios');
const _ = require("lodash");

const { executeInTransaction } = require("../data");
const User = require("../data/User");

class UserBl {
  constructor(trx) {
    this.trx = trx;
  }

  async _generateAuthToken(user) {
     return  jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);
  }

  async socialSignIn({providerType, providerToken}) {
    return executeInTransaction(this, async () => {
  
        let profile = await getProfileByToken({providerToken, providerType});
         var user= await this.findByEmail(profile.email);

         if (user !== null)  {
            user.authToken = this._generateAuthToken(user);
            return  user; 
         }

         return null;   // user is not found
    });
  }


  async socialSignUp({phone, providerToken, providerType }) {
    return await executeInTransaction(this, async () => {

      let user = await getProfileByToken({providerToken, providerType});

      user.phone = phone;

      const found = await this.findByEmail(user.email);
      if (found !== null) {
        throw new Error("Email already exists!");
      }

      const inserted = await User.query(this.trx)
        .allowInsert("[firstName, lastName,  email,  phone, picture]")
        .insert(user);

      inserted.authToken = await this._generateAuthToken(inserted);
      return  inserted;
      
    });
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
