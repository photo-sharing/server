const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/auth')

router.get('/', (req, res) => {
  res.send('INDEX ADMIN')
})

router.post('/login', adminController.login)

module.exports = router