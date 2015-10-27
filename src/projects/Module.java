/**
 * Projects page
 * @author MasSakrA@DemnArctis
 */
package projects;


import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.annotation.WebServlet;

import projects.models.Project;

@WebServlet("/projects")
public class Module extends core.Module {
	
	private static final long serialVersionUID = -5417750312822869743L;
	
	/**
	 * Main page
	 */
	public void actionGetIndex() {
		List<Project> projects = null;
		try {
			projects = Source.getProjects();
		} catch ( SQLException e ) {
			sendError( e );
		}
		Map<String, Object> params = new HashMap<>();
		params.put( "projects", projects );
		render( "projects/index.jsp", params );
	}
	
	public void actionGetGetall() {
		setJsonResponse();
		List<Project> projects = null;
		try {
			projects = Source.getProjects();
			ajaxResponse( "ok",  projects);
		} catch ( Exception e ) {
			ajaxResponse( "error", e.getMessage() );
		}
	}
	
	/**
	 * Create new project
	 */
	public void actionPostCreate() {
		setJsonResponse();
		try {
			Project newProject = new Project();
			newProject.setName( getRequestParam( "project[name]" ));
			newProject.setDescription( getRequestParam( "project[description]" ));		
			int id = Source.createProject( newProject );
			// Set new id
			newProject.setId(id);
			ajaxResponse( "ok",  newProject);
		} catch ( Exception e ) {
			ajaxResponse( "error", e.getMessage() );
		}

	}
	
	/**
	 * Create new project
	 */
	public void actionPostSave() {
		setJsonResponse();
		try {
			Project newProject = Source.getProject(getIntRequestParam( "project[id]" ));
			newProject.setName( getRequestParam( "project[name]" ));
			newProject.setDescription( getRequestParam( "project[description]" ));		
			Source.saveProject( newProject );
			ajaxResponse( "ok",  newProject);
		} catch ( Exception e ) {
			ajaxResponse( "error", e.getMessage() );
		}

	}
	
	/**
	 * Delete specified project
	 */
	public void actionPostDelete() {
		setJsonResponse();
		int id = getIntRequestParam( "id" );
		try {
			Source.deleteProject( id );
			ajaxResponse( "ok" );
		} catch ( Exception e ) {
			ajaxResponse( "error", e.getMessage() );
		}
	}
}
