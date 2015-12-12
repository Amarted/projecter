App.Class.Resolution = function( width, height, unit ) {
	
	var _ = this, _width, _height, _unit;
	
	_.GetWidth = function() {
		return _width;
	}
	_.SetWidth = function( newWidth ) {
		_width = newWidth;
	}
	
	_.GetHeight = function() {
		return _height;
	}
	_.SetHeight= function( newHeight ) {
		_height = newHeight;
	}
	
	_.GetUnit = function() {
		return _unit;
	}
	_.SetUnit= function( newUnit ) {
		_unit = newUnit;
	}
	
	/** Constructor */
	_Init = function() {
		if ( typeof width !== 'number' || 
				typeof height !== 'number' ) {
			return false;
		}
		_.SetWidth( width );
		_.SetHeight( height );
		_.SetUnit( unit );
		
		return _;
	}	
	
	return _Init();
}