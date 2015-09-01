package projects.models;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * Project source model
 * @author MasSakeA@DemnArctis
 *
 */
public class Project extends core.Model {
	

	private Integer _id;
	private String _name;
	private String _description;
	private String _active;
	
	public Project(){};
	public Project( ResultSet result ) throws SQLException {
		_id = result.getInt("id");
		_name = result.getString("name");
		_description = result.getString("description");
		_active = result.getString("active");
	}
	
	public String getName() {
		return _name;
	}
	public void setName(String name) throws IllegalArgumentException {
		if ( name.length() == 0 ) {
			throw new IllegalArgumentException("Не указанно имя проекта");
		}
		_name = name;
	}
	public String getDescription() {
		return _description;
	}
	public void setDescription(String description) {
		_description = description;
	}
	
	public Integer getId() {
		return _id;
	}
	public void setId(int id) {
		_id = id;
	}
	public String getActive() {
		return _active;
	}
	public void setActive(String active) {
		_active = active;
	}
		

}
