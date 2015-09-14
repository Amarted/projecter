/**
 * Class to work with form.
 */

App.Class.Form = function( selector ) {
	
	var _ = this;
	
	_.element = null;
	_.validator = null;
	
	_.Init = function() {
		// Check parameters
		if ( ! selector ) {
			console.log( "Неверные параметры" );
			return null;
		}
		// Get form container
		_.element = $( selector );
		if ( ! _.element.length ) {
			console.log( "Не найдена форма" );
			return null;
		}
		
		// Run user configuration
		_.Configure();
		
		// Create validator if was not set yet
		if ( _.validator === null ) {
			_.validator = _.element.validate();
		}
	};
	
	// Override this method to configure
	_.Configure = function() {}
	
	/** 
	 * Data methods
	 */
	
	// Reset form
	_.Reset = function() {
		/** Clear data, reset messages and indicators  */
		_.element
			.find(':input:not(button):not(:checkbox)').val('').end()
			.find('input[type="checkbox"]').prop('checked', false).end()
			.find('label.error').remove().end()
			.find('.form-control.error').removeClass('error').end()
			.find('.alert').hide().end()
			.trigger('reset.Form');		
	};
	
	// Set data to modal form 
	_.SetData = function( data ) {
		for ( var propName in data ) {	
			/** Set object ptoperties values to correspond form inputs */
			var inputValue = data[ propName ];
			var input = _.element.find(':input[name="' + propName + '"]');
			if ( input.attr('type') == 'checkbox' ) {
				// Checkbox input
				_setCheckboxValue( input, inputValue );
			} else if ( input.prop( 'tagName' ) == 'SELECT' ) {
				// Select input
				_setSelectValue( input, inputValue );				
			} else {
				// Normal input
				input.val( inputValue );
			}
		}
	};
	// Get data from modal form
	_.GetData = function() {
		var data = {}
		var name = '';
		var value = '';
		$.each( _.element.find( ':input:not(button)' ), function( index, element ) {
			/** Get property name, clear data class name if exists */
			if ( _.dataClassName == '' ) {
				name = $( element ).attr('name');
			} else {
				name = $( element ).attr('name').replace(new RegExp(_.dataClassName + '\\[(.*)\\]'), '$1');
			}
			if ( $( element ).attr( 'type' ) == 'checkbox' ) {
				if ( $( element ).is( ':checked' )) {
					value = $( element ).val();
				} else {
					value = 0;
				}
			} else {
				// Get property value
				value = $(element).val();
			}
			// Add property to data object
			data[name] = value;			
		});
		return data;
	};
	
	/** Private interface */
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