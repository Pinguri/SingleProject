<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <article class="admin_con">
        <div class="sec_box">
            <!-- QS GROUP INFO -->
            <h1>설문설정</h1>
            <table class="table" id="survey_group_subject_tbl">
                <tbody id="survey_group_tbody">
                <tr>
                    <th><label for="survey_group_subject">제목</label></th>
                    <td colspan="5"><input type="text" class="input99" name="survey_group_subject" id="survey_group_subject" value="" placeholder="설문 제목을 입력해주세요." required/></td>
                </tr>
                <tr>
                    <th>설문기간</th>
                    <td colspan="5">
                        <div class="datepicker_area">
                            <input type="text" name="survey_start_date" id="survey_start_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                            <select name="survey_start_time" id="survey_start_time"></select>
                            <label class="hidden" for="survey_start_date">시작일</label>
                            <label for="survey_start_time">시 부터</label>
                            <label class="hidden" for="survey_end_date">마감일</label>
                            <input type="text" name="survey_end_date" id="survey_end_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                            <select name="survey_end_time" id="survey_end_time"></select>
                            <label for="survey_end_time">시 까지</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>사용여부<span class="must"></span></th>
                    <td colspan="5"><input type="checkbox" id="use_yn"></td>
                </tr>
                </tbody>
            </table>
            <div class="btn_area center"><input type="button" name="add_survey_btn" id="add_survey_btn" class="btn bg_deep mt10" value="설문 항목 추가"/></div>

            <div id="survey_info_div">
                <!-- QS INFO -->
                <h1>설문항목</h1>
                <table class="table mt20" name="survey_info_tbl" id="survey_info_tbl_1">
                    <colgroup>
                        <col width="12%">
                        <col width="18%">
                        <col width="23%">
                        <col width="18%">
                        <col width="23%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th rowspan="5">설문항목</th>
                        <td><label for="survey_info_subject_1">질문</label></td>
                        <td colspan="3"><input type="text" class="input70" id="survey_info_subject_1" value="" required placeholder="질문 텍스트를 입력해주세요."/>
                            <input type='button' class='btn bg_secondery' name='survey_item_remove_btn' value='삭제' />
                            <input type='button' class='btn bg_secondery' name='survey_item_up_btn' value='위로' />
                            <input type='button' class='btn bg_secondery' name='survey_item_down_btn' value='아래로' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="survey_ans_1_1">답변1</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_1" value="" required placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                        <td>
                            <label for="survey_ans_1_2">답변2</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_2" value="" required placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="survey_ans_1_3" >답변3</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_3" value="" placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                        <td>
                            <label for="survey_ans_1_4" style="margin-right: 12px;">답변4</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_4" value="" placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="survey_ans_1_5" style="margin-right: 12px;">답변5</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_5" value="" placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                        <td>
                            <label for="survey_ans_1_6" style="margin-right: 12px;">답변6</label>
                        </td>
                        <td>
                            <input type="text" class="input99" id="survey_ans_1_6" value="" placeholder="답변 텍스트를 입력해주세요."/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn_area center mt50">
                <input type="button" name="save_btn" id="save_btn" class="btn" value="저장"/>
                <c:if test="${PAGE_TYPE eq 'UPDATE'}">
                    <input type="button" name="remove_btn" id="remove_btn" class="btn bg_deep_line" value="삭제"/>
                </c:if>
                <input type="button" name="move_back_btn" id="move_back_btn" class="btn" value="목록"/>
                <input type="hidden" name="page_type" id="page_type" value="${PAGE_TYPE}"/>
                <input type="hidden" name="survey_group_key" id="survey_group_key" value="${SURVEY_GROUP_KEY}"/>
                <input type="hidden" name="remove_info_list" id="remove_info_list" value=""/>
            </div>
        </div> <!-- // sec_box -->
    </article>
</div>
<script type="application/javascript" src="<c:url value="/js/views/manager/survey/surveymng-detail.js"/> "></script>