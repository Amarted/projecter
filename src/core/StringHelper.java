package core;

import java.io.UnsupportedEncodingException;

public class StringHelper {

	static public String CapitalizeFirst( String string ) {
		 return string.substring( 0, 1 ).toUpperCase() + string.substring( 1 );
	}

	static public String convertEncoding( String str, String fromEnc, String toEnc ) {
		String encoded = null;
		try {
			encoded = new String( str.getBytes( fromEnc ), toEnc );
		} catch (UnsupportedEncodingException e) {
			core.App.log(e);
		}
		return encoded;
	}
	
	static public String toUtf( String str ) {
		return convertEncoding( str, "iso-8859-1", "UTF-8" );
	}
}
