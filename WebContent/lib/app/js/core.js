var AppClass = function() {
	var _ = this;
	_.Class = {};
	_.Request = function( url, data, method ) {
		return $.ajax({
			url: url,
			dataType: 'json',
			data: data || {},
			method: method || 'GET',
			success: function( data, textStatus, jqXHR ) {
				if ( data.error && _.autoErrors ) {
					// Show error message
					_.ShowMessage( data.error, 'error', '.app-error-place', false );
				}
			},
			error: function( jqXHR, textStatus, errorText ) {
				if ( textStatus == 'abort' ) {
					// Don't call callback on abort
					return true;
				}
			}
		});
	}
	/**
	 * params: message, type, where, clear, autoremove
	 */
	_.ShowMessage = function( params ) {
		if ( !  params.message ) {
			console.log('Set "message" param');
		}
		/** Set defaults */
		if (params.where === undefined) params.where = '.alert-place';
		if (params.type === undefined) params.type = 'success';
		if (params.clear === undefined) params.clear = true;
		if (params.autoremove === undefined) params.autoremove = true;
		/** Create alert */
		var alert = '<div class="alert alert-' + params.type + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + params.message + '</div>';
		// Clear alert place
		var $where = $(params.where);
		if (params.clear) {
			$where.find('.alert').remove();
		}
		// Add new alert
		$where.append(alert);
		// Fade and remove alert
		if ( params.autoremove ) {
			$where.find('.alert').delay(5000).hide(500);
		}
		// Scroll to alert
		var to = $where.offset() ? $where.offset().top : 0;
		$('html, body').animate({
	        scrollTop: (to - 80)
	    }, 500);
	}
	
}
var App = new AppClass();
