const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mybookuserSchema = new mongoose.Schema({
    Username: {
        type:String,
        required:true,
        unique:true
    },

    Email: {
        type:String,
        required:true,
        unique:true
    },
    Password: {
        type:String,
        required:true
    }
})


mybookuserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT); 
  return token;
};


const myBookUser = mongoose.model('MyBookUser', mybookuserSchema);

module.exports = myBookUser;