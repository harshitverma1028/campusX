// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    // Accept either x-auth-token or Authorization: Bearer <token>
    let token = req.header('x-auth-token') || null;
    if (!token) {
      const authHeader = req.header('authorization') || req.header('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // attach decoded user to req.user
      req.user = decoded.user || decoded; // depends on how token was signed
      return next();
    } catch (err) {
      console.error('Auth middleware - jwt verify failed:', err.message);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ msg: 'Server error in auth' });
  }
};
