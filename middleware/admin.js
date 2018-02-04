const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM

function requireAdmin(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token , jwtSecret,{ algorithms: [jwtAlgorithm] }, function(err, decoded) {
      if(decoded.admin == true) {
        next()
      } else {
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
      }
  });
  
}


module.exports = requireAdmin