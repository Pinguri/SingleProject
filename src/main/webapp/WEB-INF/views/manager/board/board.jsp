<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <h1 class="main_title">게시판</h1>
    <table class="main_tbl">
        <thead>
        <th>No</th>
        <th>제목</th>
        <th>갱신일</th>
        </thead>
        <tbody id="board_tbody"></tbody>
    </table>
    <div class="btn_area_right">
        <button id="add_board_btn" class="btn">글쓰기</button>
    </div>
</div>


<script type="application/javascript" src="<c:url value="/js/views/manager/board/board.js"/> "></script>