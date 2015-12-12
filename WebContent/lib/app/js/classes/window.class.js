/**
 * Class to work with windows.
 */

App.Class.Window = function( id, Resolution, Position, fromTemplate ) {
	
	var 
	_ = this;
	_window = null;	
	_head = null;
	_title = null;
	_content = null;
	_controls = null;
	_buttons = {
			close: null
	};
	_.Position = new App.Class.Position(10, 10, 0); _.Resolution = new App.Class.Resolution(300, 200, "px");
	
	/** Constructor */
	_.Init = function() {
		if ( id ) {
			// Auto create window if id was been set
			if ( fromTemplate === App.FROM_TEMPLATE ) {
				_.CreateFromTemplate( id );				
			} else {
				_.Create( id, Resolution, Position );
			}
		}
		return _;
	}
	
	/** Create html modal window */
	_.Create = function( id, Resolution, Position ) {
		
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
		// Set specified or default position
		_.SetResolution( Resolution || _.Resolution )
		_.SetPosition( Position || _.Position );	
	}
	
	_.CreateFromTemplate = function( templateId, Resolution, Position ) {
		_InitElements( '#' + templateId );
		_InitEvents();
		// Set specified or default position
		_.SetResolution( Resolution || _.Resolution )
		_.SetPosition( Position || _.Position );
	}	
	
	
	/** Display methods  */
	_.Open = function() { _window.show(); };
	_.Close = function() { _window.hide(); };	
	
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
	
	_.SetPosition = function( Position ) {
		// Check param type
		if ( ! ( Position instanceof App.Class.Position )) {
			console.log( 'Position must be instance of Position class' );
			return false;
		}	
		// Save position if window not in move (drag)
		if ( ! _.InMove ) _.Position.SetY( Position.GetY() );
		
		// Change display parameters  if it was set in position object
		if ( typeof Position.GetY() === 'number' ) {
			if ( ! _.InMove ) _.Position.SetY( Position.GetY() );
			_window.css({ top: Position.GetY('px') });
		}
		if ( typeof Position.GetX() === 'number' ) {
			if ( ! _.InMove ) _.Position.SetX( Position.GetX() );
			_window.css({ left: Position.GetX('px') });
		}
		if ( typeof Position.GetZ() === 'number' ) {
			if ( ! _.InMove ) _.Position.SetZ( Position.GetZ() );
			_window.css({ "z-index": Position.GetZ() });
		}
	}
	
	_.SetResolution = function( Resolution ) {

		if ( ! ( Resolution instanceof App.Class.Resolution )) {
			console.log( 'Resolution must be instance of Resolution class' );
			return false;
		}
		_.Resolution = Resolution;
		_window.css({ width: Resolution.GetWidth('px'), height: Resolution.GetHeight('px') });
	}
	
	/** Set body, footer and other modal elements */
	_InitElements = function( id ) {
		_window = $( id );
		_head = _window.find( '.window-head' );
		_title = _head.find( '.window-title' );
		_controls = _head.find( '.window-controls' );
		_content = _window.find( '.window-content' );
		_buttons.close = _controls.find('.window-control.close');
	}
	
	_InitEvents = function() {
		_buttons.close.on('click', null,  _.Close);
	}
		
	return _.Init();
}