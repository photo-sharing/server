const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/auth')

router.get('/', (req, res) => {
  res.send('INDEX ADMIN')
})

router.post('/login', adminController.login)

router.get('/reported', auth, adminController.getReported)

router.put('/unreport/:id', auth, adminController.unReport)

module.exports = router