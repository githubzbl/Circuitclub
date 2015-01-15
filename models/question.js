// models/question.js

var mongoose = require('mongoose');
var QuestionSchema = require('../schemas/question');
var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

// for (var i = 0; i < 1000; i++) {
// 	db.users.save({num: i});
// };

// db.users.find( { num: { $gt: 20, $lt: 25}})
// db.users.find( {num: {'$gt': 990}}).explain()
// db.users.ensureIndex({num: 1})