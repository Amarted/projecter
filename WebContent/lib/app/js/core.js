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
				// TODO
			},
			error: function( jqXHR, textStatus, errorText ) {
				if ( textStatus == 'abort' ) {
					// Don't call callback on abort
					return true;
				}
			}
		});
	}
	
}
var App = new AppClass();
