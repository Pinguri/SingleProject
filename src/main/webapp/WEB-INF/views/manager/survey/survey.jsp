<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <h1 class="main_title">설문조사</h1>
    <table class="main_tbl">
        <thead>
        <th>No</th>
        <th>설문 제목</th>
        <th>설문 기간</th>
        <th>갱신일</th>
        </thead>
        <tbody id="survey_list_tbody"></tbody>
    </table>
    <div class="btn_area_right">
        <button id="add_survey_btn" class="btn">설문작성</button>
    </div>
</div>


<script type="application/javascript" src="<c:url value="/js/views/manager/survey/surveymng.js"/> "></script>