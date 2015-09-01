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
	
	/**
	 * Create new project
	 */
	public void actionPostCreate() {
		try {
			Project newProject = new Project();
			newProject.setName( getRequestParam( "name" ));
			newProject.setDescription( getRequestParam( "description" ));		
			Source.createProject( newProject );
			response.sendRedirect( "projects" );
		} catch ( Exception e ) {
			sendError( e );
		}
	}
	
	/**
	 * Delete specified project
	 */
	public void actionPostDelete() {
		int id = Integer.parseInt( getRequestParam( "id" ));
		try {
			Source.deleteProject( id );
			response.sendRedirect( "projects" );
		} catch ( Exception e ) {
			sendError( e );
		}
	}
}
