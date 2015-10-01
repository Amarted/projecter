<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<div id="editProject" class="window hide">
<div class="head"><div class="title">Новый проект</div><div class="controls"></div></div>
<form action="${appBase}projects?action=create" method="post">
<div class="input">
	<lable>Проект</lable>
	<input class="name" type="text" name="name" maxlength="45" required />
</div>
<div class="input">
	<lable>Описание</lable>
	<textarea class="description" name="description" ></textarea>
</div>
<input class="id" type="hidden" name="id" />
<div class="controls">
	<button class="submit" type="submit">Создать</button>
</div>
</form>
</div>