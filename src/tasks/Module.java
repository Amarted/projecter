/**
 * Tasks page
 * @author MasSakrA@DemnArctis
 */
package tasks;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.annotation.WebServlet;

import projects.models.Project;
import tasks.models.Task;

@WebServlet("/tasks")
public class Module extends core.Module {
	
	private static final long serialVersionUID = -5417750312822869743L;
	
	/**
	 * Main page
	 */
	public void actionGetIndex() {
		List<Task> tasks = null;
		Integer projectId =  getIntRequestParam( "project" );
		if ( projectId == null ) {
			redirect("projects");
		} else {
			try {
				Project project = getProject( projectId );
				tasks = Source.getTasks( projectId );
				Map<String, Object> params = new HashMap<>();
				params.put( "tasks", tasks );
				params.put( "project", project );
				render( "tasks/index.jsp", params );
			} catch ( SQLException e ) {
				sendError( e );
			}			
		}
	}
	
	private Project getProject( int id ) throws SQLException {
		return projects.Source.getProject( id );
	}
	
	/**
	 * Create new task
	 */
	public void actionPostCreate() {
		try {
			int projectId =  getIntRequestParam( "project" );			
			Task newTask = new Task();
			newTask.setName( getRequestParam( "name" ));
			newTask.setDescription( getRequestParam( "description" ));
			newTask.setStartDate( getRequestParam( "startDate" ));
			newTask.setEndDate( getRequestParam( "endDate" ));
			newTask.setEstimate( getRequestParam( "estimate" ));
			newTask.setRealTime( getRequestParam( "realTime" ));	
			newTask.setProject( projectId );		
			Source.crateTask( newTask );
			redirect( "tasks?project=" + projectId );
		} catch ( Exception e ) {
			sendError( e );
		}
	}
	
	/**
	 * Delete specified task
	 */
	public void actionPostDelete() {
		int id = getIntRequestParam( "id" );
		Integer projectId =  getIntRequestParam( "project" );
		try {
			Source.deleteTask( id );
			redirect( "tasks?project=" + projectId );
		} catch ( Exception e ) {
			sendError( e );
		}
	}
}
