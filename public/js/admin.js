$(function() {

	var diffDisplay = function () {
   $('.per-prob').each(function(index, el) {
       var $diff = $(this).find('.difficulty');
       var difNub = $diff.data('id');
        switch(difNub) {
          case 2:
            $diff.text('易');
            break;
          case 5:
            $diff.text('中');
            break;
          case 8:
            $diff.text('难');
            break;
        };
     });
   }
  diffDisplay();
	$('.del').click(function (event) {
		var target = $(event.target);
		var id = target.data('id');
		console.log('delete:', id);
		var tr = $('.prob-id-' + id);

		$('#delModal button.del').click(function(event) {
			$('#delModal').hide();
			$.ajax({
				type: 'DELETE',
				url: '/admin/problemBank/list?id='+ id
				})
			.done(function(results) {
				if (results.success === 1) {
				if (tr.length > 0) {
				tr.remove();
				}
			}
			});
		});
	});

    // 点击后确定功能
    var data = {
    };
    $('.btn-group').on('click', function(event) {
      event.preventDefault();
      var $target = $(event.target);
      var txt = $target.text();

      $(this).find('.selected').text(txt);

      if ($target.is('a')) {
        // Ajax 提交筛选功能
        // *****
        // TODO 题目难度的筛选
        // *****

        var _sort = $target.data('sort'); // 不是字符串
        var _type = $target.data('type'); // 不是字符串
        var _diff = $target.data('diff'); // 不是字符串
        var _data = {
          sort: _sort,
          type: _type,
          diff: _diff
        };
        $.extend(true, data, _data);

        console.log('send data', JSON.stringify(data));
        $.ajax({
          url: '/admin/problemBank/list',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
        })
        .done(function(data) {
          // console.log('**receive data**:', data);
          console.log("success");
          $('.prob-list').html(data);
          diffDisplay();
          MathJax.Hub.Typeset();
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
