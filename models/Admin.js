const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../helpers/encrypt')

const adminSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        unique: true,
        required : true,
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!']
    },
    password : {
        type: String,
        require: true
    }
}, {timestamps:true})

adminSchema.plugin(uniqueValidator)

adminSchema.pre('save', function(next) {
  this.password = encrypt.hashPassword(this.password, this.email)
  next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin