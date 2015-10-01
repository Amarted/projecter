<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<table>
	<thead>
		<tr>
			<th>Название</th>
			<th>Описание</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		
		<c:forEach items="${projects}" var="project">
			<tr class="entity project">
				<td class="name"><a href="${appBase}tasks?project=${project.id}">${project.name}</a></td>
				<td class="description">${project.description}</td>	
				<td class="controls">
					<div class="data">
						<input class="id" type="hidden" name="id" value="${project.id}" />
					</div>
					<button class="edit" title="Редактировать">Редактировать</button>
					<button class="delete" type="submit" title="Удалить">X</button>					
				</td>			
			</tr>
		</c:forEach>
	</tbody>
</table>

<button id="create">Создать проект</button>

<jsp:include page="project-form.jsp" />	
<script src="${appBase}lib/app/js/classes/form.class.js"></script>
<script src="${appBase}lib/app/js/classes/window.class.js"></script>
<script src="${appBase}lib/app/js/classes/structure.class.js"></script>
<script src="${appBase}lib/app/js/projects.page.js"></script>