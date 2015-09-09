App.Class.Form = function( selector ) {
	var _ = this;
	_selector = selector;
	_window = $( '.window' + _selector );
	
	_.Show = function() {
		_window.show();		
	};
	_.Hide = function() {
		_window.hide();		
	};	
	
	
	
	
	// TODO Refactoring
	
	
	_.Reset = function() {
		/** Clear data, reset messages and indicators  */
		$( _window )
			.find( ':input:not(button):not(:checkbox)' ).val('').end()
			.find( 'input[type="checkbox"]' ).prop( 'checked', false ).end()
			.find( 'label.error' ).remove().end()
			.find( '.form-control.error' ).removeClass( 'error' ).end()
			.trigger( 'form.reset' );		
	};
	/** Set data to  form */
	_.SetData = function( data ) {
		// Fill form
		for ( var inputName in data ) {	
			/** Set object properties values to correspond form inputs */
			var inputValue = data[ inputName ];
			var input = form.find( ':input[name="' + inputName + '"]' );
			if ( input.attr( 'type' ) == 'checkbox' ) {
				if ( inputValue == 0 ) {
					input.prop( 'checked', false );
				} else {					
					input.prop( 'checked', true );
				}
			} else if ( input.prop( 'tagName' ) == 'SELECT' ) {
				/** Set value only if this value is exists in select's options */
				var existVals = []
				input.find('option').each( function( index, element ) {
					existVals.push( $( element ).val() );
				})
				
				// Convert any value to string
				if( typeof inputValue.toString === 'function') {
					inputValue = inputValue.toString();
				}
				// Find value
				if ( existVals.indexOf( inputValue ) !== -1 ) {
					input.val( inputValue );
				}
				
			} else {
				input.val(inputValue);
			}
		}
		$( _window ).trigger( 'form.setData' );
	};
	
	/** Get data from modal form */
	_.GetData = function() {
		var data = {}
		var name = '';
		var value = '';
		$.each( _window.find( ':input:not(button)' ), function( index, element ) {
			name = $( element ).attr('name');
			
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
	
	
	_.Submit = function(formElement) {
		var formData = _.GetData();
		$.post(_.baseUrl + '/' + _.submitAction, formData).done(function(data){
			/** Check for errors */
			if(typeof data.errors == 'undefined') {
				App.ShowMessage('Данные успешно сохранены', 'success', '.app-alert-place');
				_.Hide();	
				$(_window).trigger('afterSave.Form', [data, formData]);			
				
			} else {
				/** Show errors */				
				var validatorErrors = {};
				var fieldName = '';
				var errorsDetected = false;
				if( typeof data.errors !== 'string' ) {
					for(var field in data.errors) {
						console.log(field)
						errorsDetected = true;
						if(_.dataClassName != '') {
							fieldName = _.dataClassName  + '[' + field + ']'
						} else {
							fieldName = field;
						}
						validatorErrors[fieldName] = data.errors[field];
					}
				}
				if( errorsDetected ) {
					$(_window).data('validator').showErrors(validatorErrors);
				} else {
					App.ShowMessage('Ошибка при сохранении данных', 'danger', '.modal .alert-place');
				}
			}
		}).fail(function(){
			App.ShowMessage('Ошибка при сохранении данных', 'danger', '.modal .alert-place');
		});	
		return false;
	}
}