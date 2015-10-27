<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Projecter</title>
	<link rel="stylesheet" type="text/css" href="${appBase}lib/app/css/main.css" />
	<link rel="stylesheet" type="text/css" href="${appBase}lib/third/bootstrap/css/glyphicons.css" />
	<link rel="stylesheet" type="text/css" href="${appBase}lib/app/css/components/window.css" />
</head>

<body>
	<nav>
		<ul>
			<li><a href="${appBase}">Главная</a></li>
			<li><a href="${appBase}projects">Проекты</a></li>
		</ul>
	</nav>
	<div class="app-error-place"></div>
	<script type="text/javascript" src="${appBase}lib/third/jquery.min.js"></script>
	<script type="text/javascript" src="${appBase}lib/app/js/core.js"></script>
	<script type="text/javascript" src="${appBase}lib/app/js/app.js"></script>
	<jsp:include page="/${viewFile}" />	
</body>
</html>