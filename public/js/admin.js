$(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		console.log('delete:', id);
		var tr = $('.prob-id-' + id);

		$('#delModal button.del').click(function(event) {
			$('#delModal').hide('slow');
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
});
