<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<table cellspacing="0" id="projects">
	<thead>
		<tr>
			<th>Название</th>
			<th>Описание</th>
			<th></th>
		</tr>
	</thead>
	<tbody class="list"></tbody>
</table>

<button id="create"><span class="icon glyphicon glyphicon-plus"></span> Создать проект</button>

<jsp:include page="project-form.jsp" />	
<script src="${appBase}lib/app/js/classes/form.class.js"></script>
<script src="${appBase}lib/app/js/classes/window.class.js"></script>
<script src="${appBase}lib/app/js/classes/structure.class.js"></script>
<script src="${appBase}lib/app/js/projects.page.js"></script>