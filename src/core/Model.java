package core;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Model {

	/**
	 * Fabric method to create set of Parent model c
	 * @param result
	 * @param className
	 * @return
	 */
	public static List<?> createModels( ResultSet result, Class<?> concreteModelClass  ) {
		Constructor<?> construt = null;
		List<Model> models = new ArrayList<>();	
		try {			
			construt = concreteModelClass.getConstructor( ResultSet.class );		
			while( result.next() ) {
				Model model = ( Model ) construt.newInstance( result );
				models.add( model );
			}
		} catch ( InstantiationException | IllegalAccessException
				| IllegalArgumentException | InvocationTargetException
				| SQLException | NoSuchMethodException | SecurityException e ) {
			// Cannot to create model
			core.App.log(e);
			return null;
		}
		return models;
	}
}
