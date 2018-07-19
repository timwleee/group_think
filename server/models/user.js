var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type:String, required:[true, 'Username is required!']},
  password: {type:String, required:[true, 'Password is required']},
  password_confirmation: {type:String, required: [true, 'Passwords must match']},
}, {timestamps:true})

var User = mongoose.model('User',userSchema);