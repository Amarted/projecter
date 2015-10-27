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
	/**
	 * TODO create row in UI
	 */
	var templ = '<tr class="entity project">';
	templ += '	<td><a class="name" href="' + App.Base + 'tasks?project=' + project.id + '">' + project.name + '</a></td>';
	templ += '	<td class="description">' + project.description + '</td>';
	templ += '	<td class="controls">';
	templ += '	<div class="data">';
	templ += '		<input class="id" type="hidden" name="id" value="' + project.id + '" />';
	templ += '	</div>';
	templ += '	<button class="edit" title="Редактировать">Редактировать</button>';
	templ += '	<button class="delete" type="submit" title="Удалить">X</button>	';				
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
	var data = {
		action: "getall",
		filter: filter || null
	};

	App.Request( "projects", data, "GET" ).done( function( response ) {
		if ( response.status == "error" ) return;
		
		// Add each row to UI
		for ( var i in response ) {
			var project = response[i]
			projectsList.Add( project );
		}
	});
}


editWindow.form = { 
	container: $("#editProject"),
	statuses: {
		CREATE: "create",
		EDIT: "edit"
	}
};
editWindow.form.element =  editWindow.form.container.find("form");
editWindow.form.status = editWindow.form.statuses.CREATE;
editWindow.form.buttons = {
	submit: editWindow.form.container.find(".controls .submit")
}
editWindow.form.data = new App.Class.Structure($("#editProject form") , projectFields);

/** Submit method */
editWindow.form.Submit = function() {
	
	var project = editWindow.form.data.GetAllData();
	 
	if ( editWindow.form.status ===  editWindow.form.statuses.CREATE ) {		
		editWindow.form.Create( project );
	} else if ( editWindow.form.status ===  editWindow.form.statuses.EDIT ) {
		editWindow.form.Save( project );
	}
	return false;
}
/** Create new project */
editWindow.form.Create = function( project ) {
	
	var data = {
			action: "create",
			project: project
		};
	/**
	 * @todo Fix: .done method is not working. But .always is works, why?
	 */
	App.Request( "projects", data, "POST" ).always( function( response ){ 
		console.log(2, response.status)
		if ( response.status == "error" ) return;
		// Add to UI
		console.log(3,response)
		project.id = response.data.id
		projectsList.Add( project );
	});
}
/** Save project */
editWindow.form.Save = function( project ) {
	
	var data = {
			action: "save",
			project: project
		};
	App.Request( "projects", data, "POST" ).always( function( response ) { 
		if ( response.status == "error" ) return;
		projectsList.UpdateEdited( project );
	});
}

// EVENTS

// Creating project
$( "#create").on( "click", function( event ) {
	
	editWindow.form.data.SetAllData( clearProjectData );
	
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
		var entity = new App.Class.Structure( entityRow, projectFields );	
		editWindow.form.data.SetAllData( entity.GetAllData() );
	
		editWindow.SetTitle("Редактирование проекта");
		editWindow.form.buttons.submit.text( "Сохранить" );
		editWindow.form.status = editWindow.form.statuses.EDIT;
		projectsList.currentRow = entityRow;
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
editWindow.form.element.submit( editWindow.form.Submit );
