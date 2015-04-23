// home.js

exports.index = function (req, res) {
  console.log('user in session:', req.session.user);
  res.render('index', { 
    title: '电路分析',
    user: req.session.user 
  });  
};