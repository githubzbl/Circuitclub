// models/user.js

var mongoose = require('mongoose');
// var UserSchema = require('../schemas/user'); // 创建Schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
  name: {
    type: String
  },
  password: {
    type: String
  },
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
  // body...
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

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
  }
};
var User = mongoose.model('User', UserSchema); // 注册模型

module.exports = User