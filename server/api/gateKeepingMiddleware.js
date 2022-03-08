//Keeping Secutriy Middleware -- between req and res
// import user model
const {
  models: { User },
} = require("../db");

//check if req has token --> is user
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    //class method from boiler code -- in db models for user
    req.user = user;
    next();
    // need next to move to next middleware
  } catch (e) {
    next(e);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      // if isAdmin is not true --> send 403 and message nope
      return res.status(403).send("nope");
    } else {
      // if admin is try all them to passfoward
      next();
    }
  } catch (error) {
    next(error);
  }
};

// export middleware to be used in user.js --> user express routes
module.export = {
  requireToken,
  isAdmin,
};
