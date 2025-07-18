const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

  

    const isBlacklisted = await blackListTokenModel.findOne({ tokens: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

   try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded JWT:', decoded);

  const user = await userModel.findById(decoded._id);
  console.log('Authenticated user:', user); 

  if (!user) {
       console.log("⚠️ User not found for _id in JWT:", decoded._id);
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = user;
  return next();
} catch (error) {
       console.error("Error decoding token:", error);
  return res.status(401).json({ message: 'Unauthorized' });
}

}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ tokens: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT for captain:', decoded);

        const captain = await captainModel.findById(decoded._id);
        if (!captain || !captain._id) {
            console.warn('Captain not found or missing _id:', captain);
            return res.status(401).json({ message: 'Unauthorized: Invalid captain' });
        }

        req.captain = captain;
        next();
    } catch (error) {
        console.error('authCaptain error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

