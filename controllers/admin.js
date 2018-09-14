const Admin = require('../models/Admin')
const Photo = require('../models/Photo')
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
  
  static unReport(req, res) {
    Photo.updateOne({_id: req.params.id}, {reported: 0})
      .then(() => {
        res.status(201).json({message: 'Photo back to live!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static getReported(req, res) {
    Photo.find({reported: 1})
      .then(photos => {
        res.status(200).json(photos)
      })
      .catch(err => {
        req.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller