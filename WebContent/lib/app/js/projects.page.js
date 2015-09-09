var buttons = {
		deleteEntity: $( ".entity .delete" ),
		editEntity: $( ".entity .edit" )
		
}
var editForm = new App.Class.Form( '#editEntity' );

buttons.deleteEntity.on( "click", function( event ) {
	var entityRow = $( event.target ).parents( "tr" );
	var id = entityRow.find( ".data .id" );
	var data = {
		id: id
	};
	App.Request( "/projects/delete", data, "post" ).done( function() {
		entityRow.remove();
	});
});

buttons.editEntity.on( "click", function( event ) {
	var entityRow = $( event.target ).parents( "tr" );
	var id = entityRow.find( ".data .id" );
	var data = {
		project: project
	};
	App.Request( "/projects/save", data, "post" ).done( function() {
		entityRow.remove();
	});
});