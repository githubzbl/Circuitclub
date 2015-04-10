// models/question.js

var mongoose = require('mongoose');
// var QuestionSchema = require('../schemas/question');
var QuestionSchema = new mongoose.Schema({
  order: {type: Number, unique: true},   // 题目序号
  chapter: Number,  // 章节
  degree: Number,   // 题目难度系数
  type: String,     // 题目类型
  content: String,  // 题目内容
  pic: String,      // 题目图片
  answer: String,   // 题目答案
  analysis: String, // 解析
  
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
// 保存之前查询是否为新加题目
QuestionSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  next();
});
// 静态方法
QuestionSchema.statics = {
  // 取出数据库中所有数据
  fetch: function (cb) {   
    return this
      .find({})
      .sort('meta.updateAt') // 按更新数据时间排序
      .exec(cb);
  },
  // 查询单条数据
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

// for (var i = 0; i < 1000; i++) {
// 	db.users.save({num: i});
// };

// db.users.find( { num: { $gt: 20, $lt: 25}})
// db.users.find( {num: {'$gt': 990}}).explain()
// db.users.ensureIndex({num: 1})