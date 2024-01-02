<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <article class="admin_con">
        <h4 class="main_tit">설문 관리</h4>
        <div class="sec_box">
            <h3 class="main_sub_tit">HOME / 설문관리</h3>
            <div class="search_area">
                <label for="search_gubun" class="hidden">검색구분</label>
                <select name="search_gubun" id="search_gubun">
                    <option value="">전체</option>
                    <option value="subject" selected>제목</option>
                </select>
                <label for="search_txt" class="hidden">검색어</label>
                <input type="text" name="search_txt" id="search_txt" value="" placeholder="검색어 입력"/>
                <input type="button" name="search_btn" id="search_btn" class="btn bg_secondery" value="검색"/>

                <div class="pageInfo_wrap clfix">
                <span hidden class="pageInfo">
                    <span class="totalcnt">[총 0건]</span>
                    <select id="displayno" name="displayno">
                        <option value="20" selected="selected">20건</option>
                    </select>
                    <label for="displayno">건씩보기</label>
                </span>
                </div>
            </div>

            <div class="wrap_content">
                <div class="tbl_scroll">
                    <table class="table center mt20">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">통계</th>
                            <th scope="col">제목</th>
                            <th scope="col">설문기간</th>
                            <th scope="col">최근 작업자</th>
                            <th scope="col">갱신일</th>
                            <th scope="col">사용여부</th>
                            <th scope="col">-</th>
                        </tr>
                        </thead>
                        <tbody id="survey_info_tbody">
                        <tr><td colspan="8">등록된 설문이 없습니다.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pageNav">
                <div id="paging" class="paging"></div>
                <input type="hidden" name="currpage" id="currpage" value="1" />
                <input type="hidden" name="displaycnt" id="displaycnt" value="10" />
            </div>
            <div class="btn_area right">
                <input type="button" class="btn bg_deep" id="add_survey_btn" value="설문작성"/>
            </div>
        </div> <!-- // sec_box -->
    </article>
</div>
<script type="application/javascript" src="<c:url value="/js/views/manager/survey/surveymng.js"/> "></script>