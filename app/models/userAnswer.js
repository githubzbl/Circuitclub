// models/answer.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AnswerSchema = new Schema({
  problem: {type: ObjectId, ref: 'Problem'},
  user: {type: ObjectId, ref: 'User'},
  content: String,  // 学生回答的内容
  status: Boolean,  // 是否回答正确
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

// var ObjectId = mongoose.Schema.Types.ObjectId
AnswerSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AnswerSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

var userAnswer = mongoose.model('userAnswer', AnswerSchema);

module.exports = userAnswer;
