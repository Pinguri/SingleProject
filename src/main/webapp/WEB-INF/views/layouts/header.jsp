<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<div id="header_div">
    <nav>
        <ul>
            <li><a href="${ctx}/main"><img id="main_img" src="${ctx}/images/favicon.ico"/></a></li>
        </ul>
    </nav>
</div>
<div id="menu_div">
    <nav>
        <ul>
            <li><a href="${ctx}/manager/board">게시판</a></li>
            <li><a href="#">공지사항</a></li>
            <li><a href="#">설문조사</a></li>
        </ul>
    </nav>
</div>

