<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<h1>${project.name}</h1>

<div class="description">${project.description}</div>
<h3>Список задач</h3>
<table>
	<thead>
		<tr>
			<th>Задача</th>
			<th>Описание</th>
			<th>Дата начала</th>
			<th>Дата окончания</th>
			<th>Оценка</th>
			<th>Затраченное время</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		
		<c:forEach items="${tasks}" var="task">
			<tr class="entity">
				<td class="name">${task.name}</td>
				<td class="description">${task.description}</td>	
				<td class="date">${task.startDate}</td>	
				<td class="date">${task.endDate}</td>	
				<td class="time">${task.estimate}</td>	
				<td class="time">${task.realTime}</td>	
				<td class="controls">
					<form action="${appBase}tasks?action=delete&project=${project.id}" method="post">
						<input type="hidden" name="id" value="${task.id}" />
						<button onclick="return confirm('Удалить задачу?')" type="submit">X</button>
					</form>
				</td>			
			</tr>
		</c:forEach>
	</tbody>
</table>

<button>Новая задача</button>

<jsp:include page="task-form.jsp" />	