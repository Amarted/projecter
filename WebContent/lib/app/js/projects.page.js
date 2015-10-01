var buttons = {
		deleteEntity: $( ".entity .delete" ),
		editEntity: $( ".entity .edit" ),
		createEntity: $("#create")
}

var projectFields = [ "id", "name", "description" ];
var clearProjectData = { id: null, name: "", description: "" };
var editWindow = new App.Class.Window( "editProject", true );
editWindow.Hide();
editWindow.form = { 
	element: $("#editProject"),
	statuses: {
		CREATE: "create",
		EDIT: "edit"
	}
};
editWindow.form.status = editWindow.form.statuses.CREATE;
editWindow.form.buttons = {
	submit: editWindow.form.element.find(".controls .submit")
}
editWindow.form.data = new App.Class.Structure( $("#editProject form") , projectFields);

buttons.createEntity.on( "click", function( event ) {
	editWindow.form.buttons.submit.text("Создать");
	editWindow.form.data.SetAllData( clearProjectData );
	editWindow.form.status = editWindow.form.statuses.CREATE
	editWindow.SetTitle("Создание проекта");
	editWindow.Show();
});

buttons.deleteEntity.on( "click", function( event ) {
	if ( ! confirm( "Удалить проект? Вы сможете восстановить его на странице архива." )) {
		return;
	}
	var entityRow = $( event.target ).parents( "tr" );
	var entity = new App.Class.Structure( entityRow, projectFields );
	var id = entity.Get("id");
	var data = {
		action: "delete",
		id: id
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
	/**
	 * TODO
	 */
	var entityRow = $( event.target ).parents( "tr" );
	var entity = new App.Class.Structure( entityRow, projectFields );
	console.log(projectFields)
	console.log(entity.GetAllData())
	editWindow.form.data.SetAllData( entity.GetAllData() );
	editWindow.form.buttons.submit.text("Сохранить");
	editWindow.form.status = editWindow.form.statuses.EDIT
	editWindow.SetTitle("Редактирование проекта");
	editWindow.Show();
});
