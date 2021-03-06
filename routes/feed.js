const express = require('express')
const Feed = require('../models/Feed')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.get('/feeds', authMiddleware.requireJWT, (req,res) => {
  Feed.find()
    .then(feeds => res.status(202).json(feeds))
    .catch(error => res.status(404).send(error))
})

module.exports = router