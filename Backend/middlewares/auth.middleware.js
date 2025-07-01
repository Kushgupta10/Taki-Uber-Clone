const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

  

    const isBlacklisted = await blackListTokenModel.findOne({ tokens: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

   try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded JWT:', decoded); // 👈 log this

  const user = await userModel.findById(decoded._id);
  console.log('Authenticated user:', user); // 👈 log this too

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = user;
  return next();
} catch (error) {
  return res.status(401).json({ message: 'Unauthorized' });
}

}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ tokens: token });

    console.log(isBlacklisted);
    

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next();
    } catch (error) {
        console.log(error);
        
         res.status(401).json({ message: 'Unauthorized' });
    }
}
