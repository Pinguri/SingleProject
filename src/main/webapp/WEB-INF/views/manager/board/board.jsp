<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <div class="item_container">
        <table class="item_tbl">
            <thead>
            <th>No</th>
            <th>제목</th>
            <th>갱신일</th>
            </thead>
            <tbody id="board_tbody"></tbody>
        </table>
    </div>
        <button id="add_board_btn" class="btn">글쓰기</button>
</div>


<script type="application/javascript" src="<c:url value="/js/views/manager/board/board.js"/> "></script>