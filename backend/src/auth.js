const jwt = require("jsonwebtoken");
const UserBl = require("./business/user-bl");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userBl = new UserBl(); 

    const user = await userBl.findByIdAndToken(decoded._id, token);
    if (user === null) {
       throw new Error();
     }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
