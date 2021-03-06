/**
 * 
 */
package core;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Base module class
 * @author MasSakrA@DemnArctis
 */
@SuppressWarnings("serial")
public class Module extends HttpServlet implements Servlet {

	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected RequestDispatcher layoutView;
	protected String layout = "/layout/main.jsp";
	
	@Override
	public void doGet( HttpServletRequest _request, HttpServletResponse _response ) throws IOException, ServletException {
		initRequest( _request, _response );
		runAction( "get" );
	}
	
	@Override
	public void doPost( HttpServletRequest _request, HttpServletResponse _response ) throws IOException, ServletException {
		initRequest( _request, _response );
		runAction( "post" );
	}
	
	/**
	 * Get the action parameter and run corresponding specified request type  method
	 */
	public void runAction( String requestType ) {
		String requestedAction = request.getParameter("action");
		if ( requestedAction == null ) {
			requestedAction = "index";
		}
		String actionName = "action" + 
				StringHelper.CapitalizeFirst( requestType.toLowerCase() ) + 
				StringHelper.CapitalizeFirst( requestedAction.toLowerCase() );
		
		try {
			Method method = getClass().getMethod( actionName );
			method.invoke( this );
		} catch ( 	NoSuchMethodException |
					SecurityException |
					IllegalAccessException |
					IllegalArgumentException |
					InvocationTargetException methodExc ) {

			sendError( HttpServletResponse.SC_NOT_FOUND, "No such method " + methodExc.getMessage() );
			core.App.log(methodExc);
		}	
	}
	
	
	
	private void initRequest( HttpServletRequest _request, HttpServletResponse _response ) {
		response = _response;
		response.setCharacterEncoding("UTF-8");
		request = _request;
		layoutView = request.getRequestDispatcher( layout );
	}
	
	protected void render( String viewFile, Map<String, Object> params ){
		try {
			// Set view base path
			request.setAttribute( "appBase", Settings.appBase );			
			// Set view file
			request.setAttribute( "viewFile", viewFile );
			// Set params
			for ( Map.Entry<String, Object> param : params.entrySet() ) {
				request.setAttribute( param.getKey(), param.getValue() );				
			}
			layoutView.forward(request, response);
		} catch (ServletException e) {
			sendError( HttpServletResponse.SC_NOT_FOUND, "Servlet error " + e.getMessage() );
			core.App.log(e);
		} catch (IOException e) {
			sendError( HttpServletResponse.SC_NOT_FOUND, "IO error " + e.getMessage() );
			core.App.log(e);
		}
	}
	protected void render( String viewFile ) {
		// Set empty params
		Map<String, Object> params = new HashMap<>();
		render( viewFile, params );		
	}
	
	protected void response( String responseString ) {
		try {
			// TODO sending russian encoding
			response.getWriter().write( responseString );
		} catch (IOException e) {
			sendError( HttpServletResponse.SC_NOT_FOUND, "IO error " + e.getMessage() );
			core.App.log(e);
		}
	}
	
	protected void redirect( String url ) {
		try {
			response.sendRedirect( url );
		} catch (IOException e) {
			sendError( HttpServletResponse.SC_NOT_FOUND, "Redirect error " + e.getMessage() );
			core.App.log(e);
		}
	}
	
	protected void sendError( Integer code, String message ) {
		response.setStatus( code );
		try {
			PrintWriter writer = response.getWriter();
			writer.print( message );
		} catch (IOException e) {
			core.App.log(e);
		}
	}
	
	protected void sendError( Exception e ) {
		try {
			PrintWriter writer = response.getWriter();
			String message = e.getMessage();
			writer.print( message );
			core.App.log(e);
		} catch (IOException exc) {
			core.App.log(exc);
		}
	}

	/**
	 * Formate json string from object
	 * For this get all object fields and join they as "name":"value" pairs
	 * @return String json
	 */
	private String toJson( Object data ) {
		String jsonObject = "";
		Field[] fields = data.getClass().getDeclaredFields();
		int fieldsLength = fields.length;
		for ( int i = 0; i < fieldsLength; i++ ) {
			Field field = fields[i];
			// Set to public acess
		    field.setAccessible(true);
		    Object value;
			try {
				value = field.get(data);
				if (value != null) {
					// Replace prefix if exists
					String fieldName = field.getName();
					if ( fieldName.startsWith("_") ) {
						fieldName = fieldName.replaceFirst("_", "");
					}
			    	jsonObject += "\"" + fieldName + "\":" + "\"" + value + "\", ";			    	
			    }
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				sendError(e);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				sendError(e);
			} 
		}		
		
		// TODO escape quotes for json ?
		
		// Remove last comma and space
		jsonObject = jsonObject.replaceAll(", $","");
		// Wrap to bracers
		jsonObject = "{" + jsonObject + "}";
		
		return jsonObject;
	}
	
	protected void ajaxResponse( String status, List<?> dataList ) {
		String jsonObjects = "";
		for ( Iterator<?> iter = dataList.listIterator(); iter.hasNext(); ) {
			Object obj= iter.next();
			jsonObjects += toJson( obj );
			jsonObjects += ", ";
		}
		// Remove last comma and space
		jsonObjects = jsonObjects.replaceAll(", $","");
		// Wrap to bracers
		jsonObjects = "[" + jsonObjects + "]";
		
		String json = "{\"status\":\"" + status + "\", " + "\"data\":" + jsonObjects + "}";
		response(json);
	}
	
	protected void ajaxResponse( String status, Object data ) {
		String jsonObject = toJson(data);	
		
		String json = "{\"status\":\"" + status + "\", " + "\"data\":" + jsonObject + "}";		
		response(json);
	}
	
	protected void ajaxResponse( String status, String message ) {
		// TODO escape quotes for json
		String json = "{\"status\":\"" + status + "\", \"message\":\"" + message + "\"}";		
		response(json);
	}
	
	protected void ajaxResponse( String status ) {
		// TODO escape quotes for json
		String json = "{\"status\":\"" + status + "\"}";		
		response(json);
	}
	
	protected String getRequestParam( String paramName ) {
		String param = null;
		try {
			// Get and convert request parameter to UTF-8
			
			param = request.getParameter( paramName );
			String encoding = request.getCharacterEncoding();
			if ( encoding != "UTF-8") {
				param = new String( param.getBytes( request.getCharacterEncoding() ), "UTF-8" );
			}
		} catch (UnsupportedEncodingException e) {
			core.App.log(e);
		}
		return param;
	}
	
	protected int getIntRequestParam( String paramName ) {		
		// Get and convert request parameter to UTF-8
		String stringParam = null;
		Integer param = null;
		try {
			stringParam = new String( request.getParameter( paramName ).getBytes( "iso-8859-1" ), "UTF-8" );
			param = Integer.parseInt(stringParam);
		} catch (UnsupportedEncodingException | NumberFormatException e) {
			core.App.log(e);
		}			
		return param;		
	}
	
	protected void setJsonResponse() {
		response.setContentType("application/json");
	}
	
}
