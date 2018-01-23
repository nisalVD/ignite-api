const express = require('express')
const Question = require('../models/Question')

const router = new express.Router()

// find all the questions under certain module ID
router.get('/module/:id/questions', (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})

module.exports = router