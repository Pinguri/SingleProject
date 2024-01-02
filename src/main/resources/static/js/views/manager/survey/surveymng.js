const SurveyController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {
        const searchTxt = document.getElementById("search_txt");
        const searchGubun = document.getElementById("search_gubun");
        const searchBtn = document.getElementById("search_btn");
        const currPage = document.getElementById("currpage");
        const displayNo = document.getElementById("displayno");
        const addSurveyBtn = document.getElementById("add_survey_btn");
        const surveyInfoTbody = document.getElementById("survey_info_tbody");
        const totalCnt = document.getElementsByClassName('totalcnt')[0];
        const pageType = document.getElementById("page_type");

        return {
            searchTxt,
            searchGubun,
            searchBtn,
            currPage,
            displayNo,
            addSurveyBtn,
            surveyInfoTbody,
            totalCnt,
            pageType
        }
    })();

    const paging = new CSPaging('paging', 'displayno', 'currpage', searchSurveyInfo, 0);

    function searchSurveyInfo(e) {
        if(e !== undefined) {
            let searchYn = false;
            if(e === "search_txt" || e.target.id === 'search_btn'){
                searchYn = true;
            }
            if (searchYn && isNull(Elements.searchTxt.value)) {
                alert("검색어를 입력해주시기 바랍니다.");
                return false;
            }
            if (searchYn && Elements.searchTxt.value.length < 2) {
                alert("검색어 길이는 2자이상 입력해주시기 바랍니다.");
                return false;
            }
        }
        let dataObject = {};

        dataObject.search_txt = Elements.searchTxt.value;
        dataObject.search_gubun = Elements.searchGubun.value;
        dataObject.currpage = Elements.currPage.value;
        dataObject.displayno = Elements.displayNo.value;

        commonAjax(BASE_URL+"/search", "GET", dataObject, true, createSurveyList, true);
    }

    function createSurveyList(response) {
        if(response.result === "error") { alert(response.msg);return false; }
        let targetHtml = Elements.surveyInfoTbody;
        let appendHtml = [];
        let surveyInfo = response.SURVEY_INFO;

        if(response.TOTAL_CNT < 1) {
            Elements.totalCnt.innerText = '[총 0건]';
            paging.regenerator(0);
            Elements.surveyInfoTbody.innerHTML = "<tr><td colspan='8'>등록된 설문이 없습니다.</td></tr>";
            return false;
        }

        surveyInfo.forEach(function (e) {
            appendHtml.push("<tr>");
            appendHtml.push("<td>"+replaceNull(e.RN)+"</td>");
            appendHtml.push("<td><input type='button' class='btn bg_deep_line' name='statistics_btn' id='statistics_btn_"+replaceNull(e.SURVEY_GROUP_KEY)+"' value='보기'/></td>");
            appendHtml.push("<td>");
            appendHtml.push("<a href='"+getContextPath()+"/manager/survey/detail/"+replaceNull(e.SURVEY_GROUP_KEY)+"' target='_self'>"+replaceNull(e.SURVEY_GROUP_SUBJECT)+"</a>");
            appendHtml.push("<span> "+replaceNull(e.ING)+"</span>");
            appendHtml.push("</td>");
            appendHtml.push("<td>"+replaceNull(e.SURVEY_DATE)+"</td>");
            appendHtml.push("<td>"+replaceNull(e.WORKER)+"</td>");
            appendHtml.push("<td>"+replaceNull(e.UPDATE_DATE)+"</td>");
            appendHtml.push("<td>"+replaceNull(e.USE_YN)+"</td>");
            //appendHtml.push("<td>"+ToggleController.CreateToggleEl("checkbox", e.QS_GROUP_KEY, e.USE_YN)+"</td>");
            appendHtml.push("<td>");
            appendHtml.push("<div class='btn_area'><button type='button' class='btn btn_edit move_detail' id='"+replaceNull(e.QS_GROUP_KEY)+"'>편집</button></div>");
            appendHtml.push("</td>");
            appendHtml.push("</tr>");
        });
        targetHtml.innerHTML = appendHtml.join('');

        Elements.totalCnt.innerText = '[총 ' + response.TOTAL_CNT + '건]';
        paging.regenerator(response.TOTAL_CNT);

        document.querySelectorAll(".move_detail").forEach(function(el) {
            el.addEventListener("click", moveDetailPage);
        });


    }
    function moveDetailPage(e) {
        window.location.href = BASE_URL + "/detail/"+e.target.id;
    }
    function goAddSurvey() {
        window.location.href = BASE_URL + "/add";
    }





    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click", goAddSurvey);
    }

    function init() {
        searchSurveyInfo();
        setEventListener();

    }

    return {
        init
    }
})();

SurveyController.init();