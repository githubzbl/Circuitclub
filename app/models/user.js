// models/user.js

var mongoose = require('mongoose');
var bcrypt    = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
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
    type: String,
    default: 'std'
  },
  // question: {
  //   type: ObjectId,
  //   ref: 'Question'
  // },
  myQues: [],    // 做过的题目
  myPaper: [Schema.ObjectId],   // 做过的考卷

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
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        // console.log('hash:%s, password: %s', hash, user.password);
        next();
    });
  });
});

UserSchema.methods = {
  comparePassword: function(_password, cb) {   
    bcrypt.compare(_password, this.password, function(err, isMatch) {
        // res == true
          if (err) return cb(err);

          cb(null, isMatch);
    });
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