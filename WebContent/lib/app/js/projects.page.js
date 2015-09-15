var buttons = {
		deleteEntity: $( ".entity .delete" ),
		editEntity: $( ".entity .edit" )
		
}
var editForm = new App.Class.Form( '#editEntity' );

buttons.deleteEntity.on( "click", function( event ) {
	if ( ! confirm( "Удалить проект? Вы сможете восстановить его на странице архива." )) {
		return;
	}
	var entityRow = $( event.target ).parents( "tr" );
	var idInput = entityRow.find( ".data .id" );
	if ( ! idInput.length ) {
		console.log("Неверные данные");
		return;
	}
	var data = {
		action: "delete",
		id: idInput.val()
	};
	App.Request( "projects", data, "post" ).done( function( response ) {
		if ( ! response.status ) {
			alert( "Неверный ответ сервера" )
			return;
		}
		if (  response.status == "ok" ) {
			// remove row from UI
			entityRow.remove();
		} else if ( response.status == "error") {	
			// Show error message
			var errorMessage = response.message ? response.message : "Неизвестная ошибка";
			alert( errorMessage );			
		}
	});
});

buttons.editEntity.on( "click", function( event ) {
	var entityRow = $( event.target ).parents( "tr" );
	var id = entityRow.find( ".data .id" );
	var data = {
		project: project
	};
	App.Request( "/projects?action=delete", data, "post" ).done( function() {
		entityRow.remove();
	});
});