// models/question.js

var mongoose = require('mongoose');
// var ObjectId = Schema.Types.ObjectId

var QuestionSchema = new mongoose.Schema({
  index: { type: Number},   // 编号
  chapter: Number,          // 章节
  difficulty: Number,       // 题目难度系数
  type: String,             // 题目类型
  title: { type:String, trim: true},  // 题干
  a: { type:String, trim: true},  //选项A
  b: { type:String, trim: true},  //选项B
  c: { type:String, trim: true},  //选项C
  d: { type:String, trim: true},  //选项D
  content: { type:String, trim: true}, 
  pic: {            // 题目图片
    name: String,    // 对应的题目名称
    path: String     // 路径
  },      
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
  if (this.isNew) {
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
