package core;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * App settings
 * @author MasSakrA@DemnArctis
 *
 */
public class Database {
	private static String host = "localhost";
	private static Integer port = 3306;
	private static String dbname = "projecter";
	private static String username = "root";
	private static String password = "121998";
	private static Connection connection = null;
	
	static public Connection getConnection() {
		if ( connection == null ) {
			try {
				Class.forName("com.mysql.jdbc.Driver");
				connection = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port.toString() + "/" + dbname + "?characterEncoding=utf8", username, password);
			} catch (ClassNotFoundException e) {
				/**
				 * TODO handle error if need
				 */
				core.App.log(e);
			} catch (SQLException e) {
				/**
				 *  TODO handle error if need
				 */
				core.App.log(e);
			}
		}
		
		return connection;
	}
	
}
