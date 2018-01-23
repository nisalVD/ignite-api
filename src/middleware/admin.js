const jwt = require('jsonwebtoken')


const jwtSecret = 'placeholder-jwt-secret'
const jwtAlgorithm = 'HS256'
// const jwtExpiresIn = '7 days'

function requireAdmin(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
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