// models/user.js

var mongoose = require('mongoose');
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
  // 0: normal user
  // 1: verified user
  // 2: professional user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
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
  if (!user.isModified('password')) return next();
  // 生成10个字符的盐
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // console.log(hash);
      user.password = hash;

      next();
    });
  });
  next();
});

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    if ( _password === this.password ) {
      console.log(_password, this.password);
      cb(null, true);
    } else {
      return cb(null, false);
    }
    // bcrypt.compare(_password, this.password, function(err, isMatch) {
    //   if (err) return cb(err)

    //   cb(null, isMatch)
    // })
  }
}
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

module.exports = User;