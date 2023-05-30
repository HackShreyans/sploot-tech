const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const authenticateToken = async(req, res, next) => {
  const token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ error: 'No token provided. Access denied.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.secret_key);
 
    // Check if the decoded token includes the email
    if (!decoded.email) {
      return res.status(401).json({ error: 'Invalid token. Email not found.' });
    }

    // Retrieve the user ID based on the email (assuming you have a User model)
    const user = await User.findOne({ email: decoded.email });

    // Check if the user exists and extract the user ID
    if (!user || !user._id) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    // Add the user ID to the request object
   
    req.userId = user._id;

    // Continue to the next middleware or route handler
    console.log("inetr")
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token. Access denied.' });
  }
};

module.exports = authenticateToken;
