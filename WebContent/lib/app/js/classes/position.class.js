App.Class.Position = function( x, y, z ) {
	
	var _ = this;
	// Private 
	var _x = null, _y = null, _z = null;
	
	_.GetX = function( unit ) {
		if ( unit ) {
			return _x + unit;
		}
		return _x;
	}
	_.SetX = function( newX ) {
		_x = newX;
	}
	
	_.GetY= function( unit ) {
		if ( unit ) {
			return _y + unit;
		}
		return _y;
	}
	_.SetY= function( newY ) {
		_y = newY;
	}
	
	_.GetZ= function() {
		return _z;
	}
	_.SetZ= function( newZ ) {
		_z = newZ;
	}
	
	/** Constructor */
	_Init = function() {
		// Z is not required, 0 by default
		if ( typeof z === 'undefined' ) z = 0;
		// Check parameters
		if ( typeof x !== 'number' ||
				typeof y !== 'number' ||
				typeof z !== 'number' ) {
			return false;
		}
		_.SetY( y );
		_.SetX( x );
		_.SetZ( z );
		
		return _;
	}	
	
	return _Init();
}