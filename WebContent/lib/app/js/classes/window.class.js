/**
 * Class to work with windows.
 */

App.Class.Window = function( id, fromTemplate ) {
	
	var 
	_ = this;
	_element = null;	
	_head = null;
	_title = null;
	_body = null;
	
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
		window += '	<div class="head">';
		window += '		<div class="title"></div>';	
		window += '		<div class="controls"></div>';	
		window += '</div>';
		// Window body
		window += '	<div class="body"></div>';		
		// Window end
		window += '</div>';
		
		
		$("body").append( window );
		_SetControls( '#' + id );
	}
	
	_.CreateFromTemplate = function( templateId ) {
		_SetControls( '#' + templateId );
	}	
	
	
	/** Display mehtods  */
	_.Show = function() { _element.show(); };
	_.Hide = function() { _element.hide(); };	
	
	/** Set window body */
	_.SetBody = function( content ) {
		$( function() {
			_body.html( content );
		});
	}
	/** Set window title */
	_.SetTitle = function( content ) {
		$( function() {
			_title.html( content );
		});
	}
	_.SetHeight = function( height, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_body.css({height: height + unit});
		});
	}

	_.SetWidth = function( width, unit ) {
		if ( ! unit ) unit = 'px';
		$(function(){
			_body.css({width: width + unit});
		});
	}
	
	/** Set body, footer and other modal elements */
	_SetControls = function( id ) {
		_element = $( id );
		console.log(_element)
		_head = _element.find( '.head' );
		_title = _head.find( '.title' );
		_body = _element.find( '.body' );
	}
	
	_.Init();
	
	return _;
}