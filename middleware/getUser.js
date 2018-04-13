const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET
console.log('jwtSecret', jwtSecret)
const jwtAlgorithm = process.env.JWT_ALGORITHM
console.log('jwtAlgorithm', jwtAlgorithm )

function getUser(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token , jwtSecret,{ algorithms: [jwtAlgorithm] }, function(err, decoded) {
    req.sub = decoded.sub
    next()
  })

}


module.exports = getUser
