<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<div class="window">
<div class="title">Новый проект</div>
<form action="${appBase}projects?action=create" method="post">
<div class="input">
	<lable>Проект</lable>
	<input name="name" maxlength="45" required />
</div>
<div class="input">
	<lable>Описание</lable>
	<textarea name="description" ></textarea>
</div>
<div class="controls">
	<button type="submit">Создать</button>
</div>
</form>
</div>