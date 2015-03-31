// models/user.js

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user'); // 创建Schema
var User = mongoose.model('User', UserSchema); // 注册模型

module.exports = User