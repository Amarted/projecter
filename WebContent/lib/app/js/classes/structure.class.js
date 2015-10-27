/**
 * Class to work with structure.
 */

App.Class.Structure = function( structElem, fields ) {
	
	var _ = this;
	
	_.Init = function() {
		// Check parameters
		if ( ! structElem || ! fields ) {
			console.log( "Неверные параметры" );
			return null;
		}
		
		// Run user configuration
		_.Configure();
	};
	
	// Override this method to configure
	_.Configure = function() {}
	
	/*
	 * Data methods
	 */
	
	/**
	 * Set field value
	 */
	_.Set = function( fieldName, value ) {
		// Check for field
		if ( fields.indexOf( fieldName ) === -1 ) {
			return;
		}
		// Get field element
		var fieldElem = structElem.find( "." + fieldName );		
		// Set element value by tag type
		for ( var i = 0; i < fieldElem.length; i++ ) {
			var elem = $(fieldElem[i]);
			var tagName = elem.prop( 'tagName' ) ;
			switch ( tagName ) {
				case "INPUT":
					if ( fieldElem.attr( 'type' ) === "checkbox" ) { 
						_setCheckboxValue( fieldElem, value ); 
					} else {
						fieldElem.val( value );
					}
					break;
					
				case "TEXTAREA":
					fieldElem.val( value );
					break;
			
				case "SELECT":
					_setSelectValue( fieldElem, value );
					break;
				
				default:
					fieldElem.text( value );
					break;
			}
		}
	}
	
	_.Get = function( fieldName ) {
		var value = null;
		var fieldElem = structElem.find( "." + fieldName );
		// Set element value by tag type
		var tagName = fieldElem.prop( 'tagName' ) ;
		switch ( tagName ) {
			case "INPUT":
			case "SELECT":
			case "TEXTAREA":
				value = fieldElem.val();					
				break;
			
			default:
				value = fieldElem.text();
				break;
		}
		
		return value;
	}
	
	/** 
	 * Set data to corresponding fields using property name as class name 
	 */
	_.SetAllData = function( data ) {
		for ( var propName in data ) {
			var value = data[ propName ];
			_.Set( propName, value );
		}
	};
	
	/** 
	 * Get structure data using fields class name as data property 
	 */
	_.GetAllData = function() {
		var data = {}
		for ( var index in fields ) {
			var propName = fields[index];
			data[propName] = _.Get( propName );		
		}		
		return data;
	};	
	
	/*
	 * Private interface 
	 */	
	
	_setCheckboxValue = function( input, value ) {
		if ( value == 0 ) {
			input.prop( 'checked', false );
		} else {					
			input.prop( 'checked', true );
		}
	}
	
	_setSelectValue = function( input, value ) {
		/** Set value only if this value is exists in select's options */
		var existVals = []
		input.find( 'option' ).each( function( index, element ) {
			existVals.push( $( element ).val() );
		})
		// Conver to string if not string
		if ( typeof inputValue.toString === 'function' ) {
			value = value.toString();
		}
		// Set value if it ound
		if ( existVals.indexOf( value ) !== -1 ) {
			input.val( value );
		}
	}
	
	return _;
}