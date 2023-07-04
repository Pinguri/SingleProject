<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link href="<c:url value="/css/common.css" />" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="wrap" class="admin">
    <div class="admin_dashboard">
        <aside>
            <header class="header">
                <tiles:insertAttribute name="header"/>
            </header>
        </aside>

        <section class="admin_container" id="container">
            <div class="container">
            <tiles:insertAttribute name="content"/>
            </div>
        </section>

    </div>
</div>
</body>
</html>
