<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="main_container">
    <h1 class="main_title">설문설정</h1>
    <table class="main_tbl" id="survey_group_subject_tbl">
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
            <td><input type="checkbox" id="use_yn"/></td>
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
                <th rowspan="8">설문항목</th>
                <th><label for="qs_subject_1">질문</label></th>
                <td><input type="text" class="input99" id="qs_subject_1"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_0">답변1</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_0"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_1">답변2</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_1"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_2">답변3</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_2"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_3">답변4</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_3"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_4">답변5</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_4"/></td>
            </tr>
            <tr>
                <th><label for="qs_ans_1_5">답변6</label></th>
                <td><input type="text" class="input99" id="qs_ans_1_5"/></td>
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


    <div class="btn_area_center">
        <input type="button" name="save_btn" id="save_btn" class="btn" value="저장"/>
        <c:if test="${PAGE_TYPE eq 'UPDATE'}">
            <input type="button" name="remove_btn" id="remove_btn" class="btn bg_deep_line" value="삭제"/>
        </c:if>
        <input type="button" name="move_back_btn" id="move_back_btn" class="btn" value="목록"/>
        <input type="hidden" name="page_type" id="page_type" value="${PAGE_TYPE}"/>
        <input type="hidden" name="qs_group_key" id="qs_group_key" value="${QS_GROUP_KEY}"/>
        <input type="hidden" name="remove_info_list" id="remove_info_list" value=""/>
    </div>

</div>


<script type="application/javascript" src="<c:url value="/js/views/manager/survey/surveymng-detail.js"/> "></script>