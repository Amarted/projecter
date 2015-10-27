package projects;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import projects.models.Project;
import core.Database;
import core.Model;

/**
 * Base data source class to get data from database
 * @author MasSakrA@DemnArctis
 */
public class Source extends Database {
	
	public static List<Project> getProjects() throws SQLException {
		List<Project> projects = null;
		ResultSet result = null;
		Connection db = getConnection();
		String sql = "SELECT * FROM projects WHERE active = '1'";

		try ( Statement command = db.createStatement() ) {
			result = command.executeQuery(sql);
			projects = ( List<Project> ) Model.createModels( result, Project.class );
		};
		return projects;
	}
	
	public static Project getProject( Integer id) throws SQLException {
		List<Project> projects = null;
		ResultSet result = null;
		Connection db = getConnection();
		String sql = "SELECT * FROM projects WHERE id = ? LIMIT 1";

		try ( PreparedStatement command = db.prepareStatement(sql) ) {
			command.setInt(1, id);
			result = command.executeQuery();
			projects = ( List<Project> ) Model.createModels( result, Project.class );
		};
		return projects.size() != 0 ? projects.get(0) : null;
	}
	
	/**
	 * Save the new project in database
	 * @param project
	 * @throws SQLException
	 * @return int Inserted id
	 */
	public static int createProject( Project project ) throws SQLException {
		Connection db = getConnection();
		String sql = "INSERT INTO projects(name, description) VALUES(?, ?)";		
		
		try ( PreparedStatement  createCommand = db.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS) ) {
			createCommand.setString( 1, project.getName() );
			createCommand.setString( 2, project.getDescription() );
			createCommand.executeUpdate();
			// Get generated Id
			ResultSet keys = createCommand.getGeneratedKeys();
			keys.next();
			return keys.getInt(1);
		}
	}

	public static void deleteProject(int id) throws SQLException {
		Connection db = getConnection();
		String sql = "UPDATE projects SET active = '0' WHERE id = ?";		
		
		try ( PreparedStatement  createCommand = db.prepareStatement(sql) ) {
			createCommand.setInt( 1, id );
			createCommand.executeUpdate();
		}		
	}

	public static void saveProject(Project project) throws SQLException  {
		Connection db = getConnection();
		String sql = "UPDATE projects SET name = ?, description = ? WHERE id = ?";		
		
		try ( PreparedStatement  createCommand = db.prepareStatement(sql) ) {
			createCommand.setString( 1, project.getName() );
			createCommand.setString( 2, project.getDescription() );
			createCommand.setInt( 3, project.getId() );
			createCommand.executeUpdate();
		}
		
	}

}
