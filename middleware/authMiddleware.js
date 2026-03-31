// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'mysecretkey';

function authMiddleware(req, res, next) {
  // Token from Authorization header "Bearer <token>"
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token malformatted' });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; // attach user payload for controllers to use
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


function authorizeRoles(...allowedRoles){
 return (req,res,next)=>{
   if(!req.user) return res.status(401).json({message:"Unauthorized"});
   if(!allowedRoles.includes(req.user.role))
      return res.status(403).json({message:"Access denied"});
   next();
 }
}

module.exports = {authMiddleware,authorizeRoles};