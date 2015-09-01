/**
 * Home page
 * @author MasSakrA@DemnArctis
 */
package home;

import javax.servlet.annotation.WebServlet;

@WebServlet("")
public class Module extends core.Module {

	private static final long serialVersionUID = -5417750319822869745L;
	
	public void actionGetIndex() {
		render("index.jsp");
	}
}
