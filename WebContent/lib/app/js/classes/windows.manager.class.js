
App.Class.WindowsManager = function() {
	
	var self = this;
	var _windows = new Array();
	
	/**
	 * @type App.Class.Window AppWindow
	 */
	self.AddWindow = function( AppWindow ) {
		if ( AppWindow && ! ( AppWindow instanceof App.Class.Window )) {
			console.log( 'Window must be instance of Window class' );
			return false;
		}
		var Z = _windows.length;
		AppWindow.SetPosition( new App.Class.Position( null, null, Z ));
		_windows.push( AppWindow );
	}
	function CreateMoveEvent() {
		var posStart = new App.Class.Position(0, 0);
		var xDelta = 0, yDelta = 0;
		var selectedWindow = null;
		/**
		 * @todo Rewrite this method to windows manager
		 */
		$(document)
			.on('mousedown', null, function( event ) {
				event.preventDefault();
				for( var z in _windows ) {
					var window = _windows[z];
					var targetWindowElem = $(event.target).parents('window-root');
					console.log(targetWindowElem.get())
					if ( targetWindowElem.length && window.IsOwnElement( targetWindowElem )) {
						selectedWindow = window;
						selectedWindow.InMove = true;
						posStart.SetX( event.pageX );
						posStart.SetY( event.pageY );
						break;
						//WindowsManager.SetToTop( self );
					}
				}
			})
			.on('mouseup', null, function( event ) {
				if ( selectedWindow ) {
					event.preventDefault();
					selectedWindow.InMove = false;
					// When moving is finished move to last deltas for save window position
					selectedWindow.Move( xDelta, yDelta );
					// Reset deltas
					xDelta = 0; yDelta = 0;
				}
			})
			.on('mousemove', null, function( event ) {
				if ( selectedWindow ) {
					var btnIsLeft = (event.which === 1);
					if ( selectedWindow.InMove && btnIsLeft ) {
						xDelta = posStart.GetX() - event.pageX;
						yDelta = posStart.GetY() - event.pageY;
						// While window in move it is no position saving, just moving
						selectedWindow.Move( xDelta, yDelta );
					}
				}
			});
	}
	
	function CreateResizeEvent() {
		/**
		 * @todo
		 */
	}
	
	self.SetToTop = function( window ) {
		var windowZ = window.Position.GetZ();
		var topWindowZ = _windows.length - 1;
		// Do nothing if this window is already on top
		if ( windowZ == topWindowZ ) {
			return;
		}
		console.log(windowZ, topWindowZ)
		/*// Set down all position which is above specified Z index
		for ( var z = windowZ; z < _windows.length; z++ ) {
			var windowToDown = _windows[z + 1];
			windowToDown.SetPosition( new App.Class.Position( null, null, z ));
			_windows[z] = windowToDown;
			console.log(z)
		}
		// Set window to top
		window.SetPosition( new App.Class.Position( null, null, topWindowZ ));
		_windows[topWindowZ] = window;*/
		console.log(_windows);
	}
	
	/** Constructor */
	self.Init = function() {
		CreateMoveEvent();
		CreateResizeEvent();
	}	
	self.Init();
	
	return self;
	
}