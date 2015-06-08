// env.js
module.exports = {
  port: {
    'local': '3000',
    'heroku': '12701'
  },
  mongodb: {
    'url': 'mongodb://localhost:27017/exam',
    'mongolab': 'mongodb://heroku_app36312175:1upr7tuimfigikg90bem6gdm05@ds031632.mongolab.com:31632/heroku_app36312175'
  },
  sessionSecret: 'uestc ee',

};
