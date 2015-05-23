// paper.js
var mongoose = require('mongoose');
var Image = require('./image');
var Problem = require('./problem');
var userAnswer = require('./userAnswer');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var PaperSchema = new Schema({
  name: String,     // 试卷名
  brief: String,    // 试卷概述
  time: Number,     // 考试时间
  problems: [{type: ObjectId, ref: 'Problem'}], // 试卷相关的问题
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
PaperSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }

  next();
});
// 静态方法
PaperSchema.statics = {
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

var Paper = mongoose.model('Paper', PaperSchema);

module.exports = Paper;
