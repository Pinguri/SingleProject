<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <h1 class="main_title">설문설정</h1>
    <table class="main_tbl">
        <tr>
            <th><label for="survey_group_subject">설문제목</label></th>
            <td><input type="text" class="input99" id="survey_group_subject"/></td>
        </tr>
        <tr>
            <th><label>설문기간</label></th>
            <td>
                <div class="datepicker_area">
                    <label class="hidden" for="survey_start_date">시작일</label>
                    <input type="text" name="survey_start_date" id="survey_start_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                    <label class="hidden" for="survey_end_date">마감일</label>
                    <input type="text" name="survey_end_date" id="survey_end_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                </div>
            </td>
        </tr>
        <tr>
            <th>사용여부</th>
            <td><input type="checkbox"/></td>
        </tr>
    </table>

    <h1 class="main_title">설문항목</h1>

    <div class="btn_area_center">
        <button id="add_survey_btn" class="btn">설문 항목 추가</button>
    </div>


    <table class="main_tbl" name="survey_info_tbl" id="survey_info_tbl_1">
        <colgroup>
            <col width="15%">
            <col width="25%">
            <col width="60%">
        </colgroup>
        <tbody>
            <tr>
                <th rowspan="7">설문항목 - 1</th>
                <th><label for="sub">질문</label></th>
                <td><input type="text" class="input99" id="sub"/></td>
            </tr>
            <tr>
                <th><label for="ans0">답변1</label></th>
                <td><input type="text" class="input99" id="ans0"/></td>
            </tr>
            <tr>
                <th><label for="ans1">답변2</label></th>
                <td><input type="text" class="input99" id="ans1"/></td>
            </tr>
            <tr>
                <th><label for="ans2">답변3</label></th>
                <td><input type="text" class="input99" id="ans2"/></td>
            </tr>
            <tr>
                <th><label for="ans3">답변4</label></th>
                <td><input type="text" class="input99" id="ans3"/></td>
            </tr>
            <tr>
                <th><label for="ans4">답변5</label></th>
                <td><input type="text" class="input99" id="ans4"/></td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: right;">
                    <input type="button" name="survey_item_remove_btn" class="survey_item_btn" value="삭제"/>
                    <input type="button" name="survey_item_up_btn" class="survey_item_btn" value="위로"/>
                    <input type="button" name="survey_item_down_btn" class="survey_item_btn" value="아래로"/>
                </td>
            </tr>
        </tbody>
    </table>


</div>


<script type="application/javascript" src="<c:url value="/js/views/manager/survey/surveymng-detail.js"/> "></script>