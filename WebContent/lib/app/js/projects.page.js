/*
 * Project page
 */

var projectFields = [ "id", "name", "description" ];
var clearProjectData = { id: null, name: "", description: "" };
var editWindow = new App.Class.Window( "editProject", true );
var projectsList = { 
	element: $( "#projects .list" ),
	currentRow: null
	};


/**
 * Adds row to UI
 * @return Object Created row
 */
projectsList.Add = function( project ) {
	var templ = '<tr class="entity project">';
	templ += '	<td><a class="name" href="' + App.Base + 'tasks?project=' + project.id + '">' + project.name + '</a></td>';
	templ += '	<td class="description">' + project.description + '</td>';
	templ += '	<td class="controls">';
	templ += '	<div class="data">';
	templ += '		<input class="id" type="hidden" name="id" value="' + project.id + '" />';
	templ += '	</div>';
	templ += '	<button class="edit" title="Редактировать"><span class="icon glyphicon glyphicon-pencil"></span></button>';
	templ += '	<button class="delete" type="submit" title="Удалить"><span class="icon glyphicon glyphicon-remove"></span></button>	';				
	templ += '	</td>';
	templ += '</tr>';
	var row = $( templ );
	projectsList.element.append( templ );
	return row;
}
/**
 * Update edited row by new data
 */
projectsList.UpdateEdited = function( newData ) {
	var project = new App.Class.Structure( projectsList.currentRow, projectFields );
	project.SetAllData( newData );
}
/**
 * Delete project from UI and from the server
 */
projectsList.Delete = function( projectRow ) {
	var project = new App.Class.Structure( projectRow, projectFields );
	var id = project.Get("id");
	var data = {
		action: "delete",
		id: id
	};
	App.Request( "projects", data, "POST" ).done( function( response ) {
		if ( response.status == "error" ) return;
		
		// Remove row from UI
		projectRow.remove();
		
	});
}
/** Load projects from server */
projectsList.Load = function( filter ) {
	App.Request( "projects", { action: "getall", filter: filter || null }, "GET" ).done( function( response ) {
		if ( response.status == "error" || ! ( response.data && response.data.length ) ) return;		
		// Add each row to UI
		for ( var i in response.data ) {
			var project = response.data[i];
			projectsList.Add( project );
		}
	});
}

// Form object
editWindow.form = { 
	container: $("#editProject"),
	statuses: {
		CREATE: "create",
		EDIT: "edit"
	}
};
// Set form element, status, buttons. etc
editWindow.form.element =  editWindow.form.container.find(".content");
editWindow.form.status = editWindow.form.statuses.CREATE;
editWindow.form.buttons = {
	submit: editWindow.form.container.find(".controls .submit")
}
// Create form data structure
editWindow.form.data = new App.Class.Structure($("#editProject .content") , projectFields);

/** Submit method */
editWindow.form.Submit = function() {
	// Get form data and detect wich method to call
	var project = editWindow.form.data.GetAllData();
	switch ( editWindow.form.status ) {
		case editWindow.form.statuses.CREATE:
			editWindow.form.Create( project );
			break;
		case editWindow.form.statuses.EDIT:
			editWindow.form.Save( project );
			break;			
	}
	// Deselect current row, clear and close form
	$("#projects .list .current").removeClass("current");
	editWindow.form.data.SetAllData( clearProjectData );
	editWindow.Hide();
	// Prevent default submitiing
	return false;
}
/** Create new project */
editWindow.form.Create = function( project ) {	
	/** @todo Fix: .done method is not working. But .always is works, why? */
	App.Request( "projects",  { action: "create", project: project }, "POST" ).always( function( response ){ 
		if ( response.status == "error" ) return;
		// Get created row id and add row to UI
		project.id = response.data.id
		projectsList.Add( project );
	});
}
/** Save project */
editWindow.form.Save = function( project ) {	
	/** @todo Fix: .done method is not working. But .always is works, why? */
	App.Request( "projects", { action: "save", project: project }, "POST" ).always( function( response ) { 
		if ( response.status == "error" ) return;
		projectsList.UpdateEdited( project );
	});
}

// MAIN CODE

projectsList.Load();

// EVENTS

// Creating project
$( "#create").on( "click", function( event ) {
	// Deselect current row
	$("#projects .list .current").removeClass("current");
	projectsList.currentRow = null;
	// Clear form data
	editWindow.form.data.SetAllData( clearProjectData );
	// Configure and show window
	editWindow.SetTitle("Создание проекта");
	editWindow.form.buttons.submit.text( "Создать" );
	editWindow.form.status = editWindow.form.statuses.CREATE;
	
	editWindow.Show();
})

// Operations
$( "#projects .list")	
	// Edit project
	.on( "click", ".edit", function( event ) {		
		var entityRow = $( event.target ).parents( "tr" );	
		// Deselect current row
		$("#projects .list .current").removeClass("current");	
		// Masrk as current
		entityRow.addClass('current');		
		projectsList.currentRow = entityRow;
		// Create new entity structure
		var entity = new App.Class.Structure( entityRow, projectFields );	
		console.log(entity)
		editWindow.form.data.SetAllData( entity.GetAllData() );
		// Configure and show window
		editWindow.SetTitle("Редактирование проекта");
		editWindow.form.buttons.submit.text( "Сохранить" );
		editWindow.form.status = editWindow.form.statuses.EDIT;
		editWindow.Show();
	})
	// Delete project
	.on( "click", ".delete", function( event ) {
		if ( ! confirm( "Удалить проект? Вы сможете восстановить его на странице архива." )) {
			return;
		}
		var entityRow = $( event.target ).parents( "tr" );
		projectsList.Delete( entityRow );
		
	});

// Submitting edit form
editWindow.form.element.on('click', 'button.submit', editWindow.form.Submit );
