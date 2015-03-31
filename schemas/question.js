// schemas/movie.js
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	order: Number,		// 题目序号
	chapter: Number,  // 章节
	degree: Number,		// 题目难度系数
	type: String,			// 题目类型
	content: String,	// 题目内容
	pic: String,			// 题目图片
	answer: String,		// 题目答案
  
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

QuestionSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}

	next();
});

QuestionSchema.statics = {
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

module.exports = QuestionSchema;