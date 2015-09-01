package tasks.models;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * Project source model
 * @author MasSakeA@DemnArctis
 *
 */
public class Task extends core.Model {
	

	private Integer _id;
	private Integer _project;
	private String _name;
	private String _description;
	private String _startDate;
	private String _endDate;
	private String _estimate;
	private String _realTime;
	private String _active;
	
	public Task(){};
	public Task( ResultSet result ) throws SQLException {
		_id = result.getInt("id");
		_project = result.getInt("project");
		_name = result.getString("name");
		_description = result.getString("description");
		_startDate = result.getString("startDate");
		_endDate = result.getString("endDate");
		_estimate = result.getString("estimate");
		_realTime = result.getString("realTime");
		_active = result.getString("active");
	}
	
	public String getName() {
		return _name;
	}
	public void setName(String name) throws IllegalArgumentException {
		if ( name.length() == 0 ) {
			throw new IllegalArgumentException("Не указанно имя задачи");
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
	public Integer getProject() {
		return _project;
	}
	public void setProject(int project) {
		_project = project;
	}
	public String getStartDate() {
		return _startDate;
	}
	public void setStartDate(String startDate) {
		if ( startDate.length() == 0 ) {
			_startDate = null;
		} else {
			_startDate = startDate;
		}
	}
	public String getEndDate() {
		return _endDate;
	}
	public void setEndDate(String endDate) {
		if ( endDate.length() == 0 ) {
			_endDate = null;
		} else {
			_endDate = endDate;
		}
	}
	public String getActive() {
		return _active;
	}
	public void setActive(String active) {
		_active = active;
	}
	public String getEstimate() {
		return _estimate;
	}
	public void setEstimate(String estimate) {
		if ( estimate.length() == 0 ) {
			_estimate = null;
		} else {
			_estimate = estimate;
		}
	}
	public String getRealTime() {
		return _realTime;
	}
	public void setRealTime(String realTime) {
		if ( realTime.length() == 0 ) {
			_realTime = null;
		} else {
			_realTime = realTime;
		}
	}
		

}
