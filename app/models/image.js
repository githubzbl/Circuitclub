//models/image.js

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/img_app');

var Imageschema = new mongoose.Schema({
  name: {
      type: String,
      // default: this.index + '-image' // 对应的题目名称
    },    
    path: String     // 存储路径
});

module.exports = mongoose.model('Image', Imageschema);