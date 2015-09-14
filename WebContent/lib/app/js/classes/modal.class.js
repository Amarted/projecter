/**
 * Class to work with modal window.
 */

App.Class.Modal = function( id, title, message, fromTemplate ) {
	
	var 
	_ = this;
	_.element = null;	
	_body = null;
	/** Constructor */
	_.Init = function() {
		$( function() {
			if ( fromTemplate ) {
				_.CreateFromTemplate( id );				
			} else {
				_.Create( id );
				if ( message ) {
					_.SetContent( message );
				}
			}				
		});
	}
	
	/** Create html modal window */
	_.Create = function( selector ) {
		var modal = '<div id="' + selector + '" class="modal">';
		modal += '	<div class="modal-dialog">';
		modal += '		<div class="modal-content">';
		modal += '			<div class="modal-header">';
		modal += '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		modal += '				<h4 class="text-center modal-title">' + title + '</h4>';
		modal += '			</div>';
		modal += '			<div class="modal-body">';
		modal += '			</div>';				
		modal += '			<div class="modal-footer form-group">';
		modal += '				<div class="text-center">';
		modal += '					<button class="btn btn-primary btn-close">Ок</button>';
		modal += '				</div>';
		modal += '			</div>';
		modal += '		</div>';
		modal += '	</div>';
		modal += '</div>';
		$("body").append( modal );
		_SetControls( '#' + id );
	}
	
	_.CreateFromTemplate = function( templateId ) {
		_SetControls( templateId );
	}	
	
	
	/** Display mehtods  */
	_.Show = function() { _.element.show(); };
	_.Hide = function() { _.element.hide(); };	
	
	/** Set modal body content */
	_.SetContent = function( content ) {
		$( function() {
			_body.html( content );
		});
	}
	_.SetFooterContent = function( content ) {
		$( function() {
			_footer.html( content );
		});
	}
	/** Set content scrollable or not */
	_.ScrollBody = function( mode ) {
		$(function(){
			if ( mode === App.ON ) {
				_body.addClass('scrollable-y');
			} else if ( mode === App.OFF ) {
				_body.removeClass('scrollable-y');
			}
		});
	}
	_.SetBodyHeight = function( height, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_body.css({height: height + unit});
		});
	}

	_.SetModalWidth = function( width, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_.element.find('.modal-dialog').css({width: width + unit});
		});
	}
	
	/** Set body, footer and other modal elements */
	_SetControls = function( id ) {
		_.element = $( id );
		_body = _.element.find( '.modal-body' );
		_footer = _.element.find( '.modal-footer' );
	}
	
	_.Init();
	
	return _;
}