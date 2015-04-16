// models/user.js

var mongoose = require('mongoose');
// var UserSchema = require('../schemas/user'); // 创建Schema
var bcrypt    = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {    // 学号
    type: String,
    unique: true
  },
  name: {        // 姓名
    type: String
  },
  password: {
    type: String
  },

  myQues: [],    // 做过的题目
  myPaper: [],   // 做过的考卷

  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }
  // 生成10个字符的盐
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = salt;
      next();
    })

  })
  next();
});

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  },
  findByUsrname: function (usrname, cb) {
    return this
      .findOne({username: usrname})
      .exec(cb);
  }
};
var User = mongoose.model('User', UserSchema); // 注册模型

module.exports = User;