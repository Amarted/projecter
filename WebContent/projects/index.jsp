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
			<tr class="entity">
				<td class="name"><a href="${appBase}tasks?project=${project.id}">${project.name}</a></td>
				<td class="description">${project.description}</td>	
				<td class="controls">
					<form action="${appBase}projects?action=delete" method="post">
						<input type="hidden" name="id" value="${project.id}" />
						<button onclick="return confirm('Удалить проект?')" type="submit">X</button>
					</form>
				</td>			
			</tr>
		</c:forEach>
	</tbody>
</table>

<button>Создать проект</button>

<jsp:include page="project-form.jsp" />	