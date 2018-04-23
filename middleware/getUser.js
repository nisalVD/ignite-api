const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM

function getUser(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token , jwtSecret,{ algorithms: [jwtAlgorithm] }, function(err, decoded) {
    req.sub = decoded.sub
    req.decoded = decoded
    next()
  })

}


module.exports = getUser
