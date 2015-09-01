<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<div class="window">
	<div class="title">Новая задача</div>
	<form action="${appBase}tasks?action=create&project=${project.id}" method="post">
		<div class="input">
			<lable>Задача</lable>
			<input type="text" name="name" maxlength="45" required />
		</div>
		<div class="input">
			<lable>Дата начала</lable>
			<input type="date" name="startDate" />
		</div>
		<div class="input">
			<lable>Дата окончания</lable>
			<input type="date" name="endDate" />
		</div>
		<div class="input">
			<lable>Оценка</lable>
			<input type="time" name="estimate" />
		</div>
		<div class="input">
			<lable>Затрачено времени</lable>
			<input type="time" name="realTime" />
		</div>
		<div class="input">
			<lable>Описание</lable>
			<textarea name="description" ></textarea>
		</div>

		<input type="hidden" name="project" value="${project.id}" />
		<div class="controls">
			<button type="submit">Создать</button>
		</div>
	</form>
</div>