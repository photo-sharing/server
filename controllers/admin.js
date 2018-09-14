const Admin = require('../models/Admin')
const encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')

class Controller {
  
  static login(req, res) {
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    
    Admin.findOne({email: req.body.email, password: hashed})
      .then(admin => {
        let obj = {
          id: admin._id
        }
        
        jwt.sign(obj, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            res.status(500).json({error: err.message})
          } else {
            res.status(201).json({token: token})
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller