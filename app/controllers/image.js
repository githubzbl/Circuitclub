// routes/image.js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Image = require('../models/image');
var fs = require('fs');
var path = require('path');
var join = path.join;

exports.form = function (req, res) {
  res.render('upload', {
    title: 'Upload'
  });
};

exports.submit = function (dir) {
  return function (req, res, next) {
    var img = req.files.image.img;
    var name = req.body.image.name || img.name;
    var path = join(dir, img.name);
    console.log('name', name);
    console.log('path', path);

    fs.rename(img.path, path, function(err){
      if (err) return next(err);

      Image.create({
        name: name,
        path: img.name
      }, function (err) {
        if (err) return next(err);
        res.redirect('/');
      })
    })
  }
}