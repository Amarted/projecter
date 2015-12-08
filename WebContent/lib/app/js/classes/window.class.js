/**
 * Class to work with windows.
 */

App.Class.Window = function( id, fromTemplate ) {
	
	var 
	_ = this;
	_window = null;	
	_head = null;
	_title = null;
	_content = null;
	_controls = null;
	_buttons = {
			close: null
	}
	
	/** Constructor */
	_.Init = function() {
		if ( fromTemplate ) {
			_.CreateFromTemplate( id );				
		} else {
			_.Create( id );
		}
	}
	
	/** Create html modal window */
	_.Create = function( id ) {
		
		// Window start
		var window = '<div id="' + id + '" class="window">';
		// Head of window
		window += '	<div class="window-head">';
		window += '		<div class="window-title"></div>';	
		window += '		<div class="window-controls"></div>';	
		window += '</div>';
		// Window body
		window += '	<div class="window-content"></div>';		
		// Window end
		window += '</div>';
		
		
		$("body").append( window );
		_InitElements( '#' + id );
		_InitEvents();
	}
	
	_.CreateFromTemplate = function( templateId ) {
		_InitElements( '#' + templateId );
		_InitEvents();
	}	
	
	
	/** Display mehtods  */
	_.Open = function() { _window.show(); };
	_.Close = function() { _window.hide();
	console.log(_window) };	
	
	/** Set window content */
	_.SetContent = function( content ) {
		$( function() {
			_content.html( content );
		});
	}
	/** Set window title */
	_.SetTitle = function( content ) {
		$( function() {
			_title.html( content );
		});
	}
	
	// Window size
	_.SetHeight = function( height, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_content.css({height: height + unit});
		});
	}
	_.SetWidth = function( width, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_content.css({width: width + unit});
		});
	}
	_.SetSize = function( width, height, unit ) {
		_.SetHeight( height, unit );
		_.SetWidth( width, unit );
		
	}
	
	/** Set body, footer and other modal elements */
	_InitElements = function( id ) {
		_window = $( id );
		console.log(_window)
		_head = _window.find( '.window-head' );
		_title = _head.find( '.window-title' );
		_controls = _head.find( '.window-controls' );
		_content = _window.find( '.window-content' );
		_buttons.close = _controls.find('.window-control.close');
	}
	
	_InitEvents = function() {
		console.log(2)
		_buttons.close.on('click', null, function(){
			_.Close();
		})
	}
	
	_.Init();
	
	return _;
}