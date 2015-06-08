$(document).ready(function() {
  // 注册验证
  var $signName = $('#signup-username');
  var $signPwd = $('#signup-password');
  var $signpwdRp = $('#signup-password-repeat');
  // 登录验证
  var $loginName = $('#login-username');
  var $loginPwd = $('#login-password');

  var regexp = /(admin)|^[0-9]{13}$/g;
  // var regexp = /^[0-9]+$/g;

  $('#loginModal, #signupModal').on('shown.bs.modal', function () {
    $('#login-username, #signup-username').focus();
  });
  $('#loginModal, #signupModal').on('hidden.bs.modal', function () {
    $('span.warning').addClass('fade');
  });
  // 注册验证
  $('#signupModal').on('submit', function(event) {
    event.preventDefault();
    var username = $signName.val();
    var pwd = $signPwd.val(), pwdRp = $signpwdRp.val();
     // 发送至服务器的数据
    var data = {
      username: username,
      password: pwd
    };
    if (!username.match(regexp)) {
      $signName.next().removeClass('fade');
    } else {
      $signName.next().addClass('fade');
    }
    if ( pwd !== pwdRp) {
      $('span.pwdNotSame').removeClass('fade');
    } else if (pwd.length < 8){
      $('span.pwdShort').removeClass('fade');
    } else {
      $('span').addClass('fade');
    }
    if ( username.match(regexp) && (pwd === pwdRp) && (pwd.length >= 8)) {

     $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify(data),   // 发送至服务器的数据
      contentType: 'application/json',
    })
    .done(function(res) {
      console.log("success");
      console.log(res);
      if (res.err === 1) {
        $signName.next().removeClass('fade')
                        .text('用户名已被占用');
      } else if (res.success === 1){
        $('button.closeModal').click();
        $('ul.nav').html('<li><a href="/std/home">个人主页</a></li><li><a href="/logout">退出</a></li>');
      }

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    }
  });
  // 登录验证
  $('#loginModal').on('submit', function(event) {
    event.preventDefault();
    var username = $loginName.val();
    var pwd = $loginPwd.val();
     // 发送至服务器的数据
    var data = {
      username: username,
      password: pwd
    };


    if ( username !== 'admin' && !username.match(regexp)) {
      return $loginName.next().removeClass('fade');
    } else {
      $loginName.next().addClass('fade');
    }

    if ( username === 'admin' || (username.match(regexp) && pwd)) {

     $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify(data),   // 发送至服务器的数据
      // data: postdata,            // 发送至服务器的数据
      contentType: 'application/json',
    })
    .done(function(res) {
      console.log("success");
      console.log(res);
      if (res.err === 1) {
        $loginName.next().removeClass('fade')
                          .text('此学号还未注册！');
        $('#loginModal').hide('slow');
        $('#signupModal').modal();
      } if (res.err === 2) {
        $loginPwd.next().removeClass('fade');

      }
      else if (res.success === 1){
        $('button.closeModal').click();
        if (username != 'admin') {
          $('#loginStatus').html('<li><a href="/std/home">我的主页</a></li><li><a href="/std/paperBank/list">我的试卷</a></li><li><li><a href="/std/problemBank/list">我的题库</a></li><li><a href="/logout">退出</a></li>');
        } else {
          $('#loginStatus').html('<li><a href="/admin/home">控制面板</a></li><li><a href="/admin/paperBank/list">试卷列表</a></li><li><li><a href="/admin/problemBank/list">题库列表</a></li><li><a href="/logout">退出</a></li>');
        }
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    }

  });

});
