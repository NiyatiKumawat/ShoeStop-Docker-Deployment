const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")


const authenticationMiddleware = asyncHandler(  async (req, res, next) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shoestop_jwt_default_secret_2026');
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized to access this route' });
    }
  } )

module.exports = authenticationMiddleware