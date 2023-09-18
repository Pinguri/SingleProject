<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <table>
        <tbody>
            <tr>
                <th><label for="title">제목</label></th>
                <td><input type="text" id="title"/></td>
            </tr>
            <tr>
                <th><label for="content">내용</label></th>
                <td><textarea id="content"></textarea></td>
            </tr>
            <tr>
                <td>
                    <input type="button" name="save_btn" id="save_btn" class="btn" value="저장"/>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<script type="application/javascript" src="<c:url value="/js/views/manager/board/board-detail.js"/> "></script>