package tasks;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import tasks.models.Task;
import core.Database;
import core.Model;

/**
 * Base data source class to get data from database
 * @author MasSakrA@DemnArctis
 */
public class Source extends Database {
	
	public static List<Task> getTasks( Integer project ) throws SQLException {
		List<Task> tasks = null;
		ResultSet result = null;
		Connection db = getConnection();
		String sql = "SELECT * FROM tasks WHERE active = '1' AND project = ?";

		try ( PreparedStatement command = db.prepareStatement( sql ) ) {
			command.setInt(1, project);
			result = command.executeQuery();
			tasks = ( List<Task> ) Model.createModels( result, Task.class );
		};
		return tasks;
	}
	
	/**
	 * Save the new task in database
	 * @param task
	 * @throws SQLException
	 */
	public static void crateTask( Task task ) throws SQLException {
		Connection db = getConnection();
		String sql = "INSERT INTO tasks(name, description, project, startDate, endDate, estimate, realTime) VALUES(?, ?, ?, ?, ?, ?, ?)";		
		
		try ( PreparedStatement  createCommand = db.prepareStatement(sql) ) {
			createCommand.setString( 1, task.getName() );
			createCommand.setString( 2, task.getDescription() );
			createCommand.setInt( 3, task.getProject() );
			createCommand.setString( 4, task.getStartDate() );
			createCommand.setString( 5, task.getEndDate() );
			createCommand.setString( 6, task.getEstimate() );
			createCommand.setString( 7, task.getRealTime() );
			createCommand.executeUpdate();
		}
	}

	public static void deleteTask(int id) throws SQLException {
		Connection db = getConnection();
		String sql = "UPDATE tasks SET active = '0' WHERE id = ?";		
		
		try ( PreparedStatement  createCommand = db.prepareStatement(sql) ) {
			createCommand.setInt( 1, id );
			createCommand.executeUpdate();
		}		
	}

}
