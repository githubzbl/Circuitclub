$(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		console.log(id);
		var tr = $('.ques-id-' + id);
		
		$.ajax({
			type: 'DELETE',
			url: '/admin/question/list?id='+ id
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