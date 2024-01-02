const SurveyDetailController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {
        const lastHtml = ""
        const addSurveyBtn = document.getElementById("add_survey_btn");
        const surveyInfoTbl = document.getElementsByName("survey_info_tbl")
        const removeInfoList = [];
        const pageType = document.getElementById("page_type");
        const removeBtn = document.getElementById("remove_btn");
        const saveBtn = document.getElementById("save_btn");
        const moveBackBtn = document.getElementById("move_back_btn");
        const surveyGroupSubjectTbl = document.getElementById("survey_group_subject_tbl");
        const surveyGroupKey = document.getElementById("survey_group_key");
        const surveyGroupTbody = document.getElementById("survey_group_tbody");
        const surveyInfoDiv = document.getElementById("survey_info_div");
        return {
            lastHtml,
            addSurveyBtn,
            surveyInfoTbl,
            removeInfoList,
            pageType,
            removeBtn,
            saveBtn,
            moveBackBtn,
            surveyGroupSubjectTbl,
            surveyGroupKey,
            surveyGroupTbody,
            surveyInfoDiv
        }
    })();



    /* 달력 생성 */
    function setDatePicker() {
        new CommonDatepicker("#survey_start_date", { id: "datepicker" });
        new CommonDatepicker("#survey_end_date", { id: "datepicker" });
    }


    function createSurveyTemplate(){

        let appendHtml = [];
        let index = Number(document.getElementsByName("survey_info_tbl").length);
        appendHtml.push("<table class='table mt20' name='survey_info_tbl' id='survey_info_tbl"+index+"'>");
        appendHtml.push("<colgroup>");
        appendHtml.push("<col width='12%'>");
        appendHtml.push("<col width='18%'>");
        appendHtml.push("<col width='23%'>");
        appendHtml.push("<col width='18%'>");
        appendHtml.push("<col width='23%'>");
        appendHtml.push("</colgroup>");
        appendHtml.push("<tbody>");
        appendHtml.push("<tr>");
        appendHtml.push("<th rowspan='5'>설문항목</th>");
        appendHtml.push("<td><label for='survey_info_subject_"+index+"'>질문</label></td>");
        appendHtml.push("<td colspan='3'>");
        appendHtml.push("<input type='text' class='input70' id='survey_info_subject_"+index+"' value='' required placeholder='질문 텍스트를 입력해주세요.'/>");
        appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_remove_btn' value='삭제' />");
        appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_up_btn' value='위로' />");
        appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_down_btn' value='아래로' />");
        appendHtml.push("</td>");
        appendHtml.push("</tr>");
        for(let i =0; i<6; i++){
            if (i % 2 === 0) {
                appendHtml.push("<tr>");
            }
            appendHtml.push("<td><label for='survey_ans_"+index+"_"+i+"'>답변"+Number(i+1)+"</label></td>");
            appendHtml.push("<td><input type='text' class='input99' id='survey_ans_"+index+"_"+i+"' placeholder='답변 텍스트를 입력해주세요.'/></td>");
            if (i % 2 === 1) {
                appendHtml.push("</tr>");
            }
        }
        appendHtml.push("</tbody>");
        appendHtml.push("</table>");
        Elements.lastHtml = document.getElementsByName("survey_info_tbl")[document.getElementsByName("survey_info_tbl").length-1];
        Elements.lastHtml.insertAdjacentHTML("afterend", appendHtml.join(''));
    }

    // 설문 항목 순서 변경
    function changeSurveyItemTarget(targetEl,changeEl){

        let targetElParentNode = targetEl.parentNode;
        let changeElParentNode = changeEl.parentNode;

        let targetClone = targetEl.cloneNode(true);
        let changeClone = changeEl.cloneNode(true);


        targetEl.remove();
        changeEl.remove();

        changeElParentNode.appendChild(targetClone);
        targetElParentNode.appendChild(changeClone);



    }

    function removeSurveyItem(removeHtml){

        Elements.removeInfoList.push(removeHtml);
        console.log(Elements.removeInfoList);

    }

    function saveSurveyTemplate() {
        let dataObject = {};
        let questionGroupObject = {};

        Elements.surveyGroupSubjectTbl.querySelectorAll("input, select").forEach(function(el){
            if(el.id) {
                if(el.id === "use_yn") {
                    questionGroupObject[el.id] = el.checked ? "Y" : "N";
                } else {
                    questionGroupObject[el.id] = el.value;
                }
            }
        });


        dataObject.survey_group_info = JSON.stringify(questionGroupObject);
        dataObject.survey_info = convertResponseData();
        dataObject.page_type = Elements.pageType.value;
        commonAjax(BASE_URL + "/info", "PUT", dataObject, true, saveSurveyResult, true);
    }

    function convertResponseData(){
        let resBodyObject = Elements.surveyInfoTbl;
        let resultList = [];

        Array.from(resBodyObject).sort();

        resBodyObject.forEach(function(el, index) {
            let questionObject = {};
            questionObject.survey_info_order = index;
            el.querySelectorAll("input[type='text']").forEach(function(e){

                if(e.id){
                    if(e.id.indexOf("survey_info_subject") > -1) {
                        questionObject["survey_info_subject"] = e.value;
                    } else if(e.id.indexOf("survey_ans") > -1){
                        questionObject[e.id] = e.value;
                    }
                }

            });

            resultList.push(questionObject);
        });
        /* item check */
        if (resultList.length < 1) return '';

        return JSON.stringify(resultList);
    }


    function saveSurveyResult(response) {
        if(response.result === "error") {
            alert(response.msg);
            return false;
        } else {
            if(Elements.pageType.value === "INSERT") {
                alert("설문 내용 생성이 되었습니다.");
            } else {
                alert("설문 내용 수정이 되었습니다.");
            }

            window.location.href = BASE_URL + "/main";
        }
    }

    function createGroupTbody(response) {
        if(isNull(response)) return false;
        let appendHtml = [];
        let info = response.SURVEY_GROUP_INFO;

        appendHtml.push("<tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='survey_group_subject'>제목</label></th>");
        appendHtml.push("<td colspan='5'><input type='text' class='input99' name='survey_group_subject' id='survey_group_subject' value='"+info.SURVEY_GROUP_SUBJECT+"' placeholder='설문 제목 입력(한글)' required/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='qs_start_date'>설문기간</label></th>");
        appendHtml.push("<td colspan='4'>");
        appendHtml.push("<input type='text' name='survey_start_date' id='survey_start_date' class='datepicker1' value='"+info.SURVEY_START_DATE+"' placeholder='달력에서 날짜 선택' required disabled/>");
        appendHtml.push("<select name='survey_start_time' id='survey_start_time'></select>")
        appendHtml.push("<label for='survey_start_time'>시 부터</label>")
        appendHtml.push("<input type='text' name='survey_end_date' id='survey_end_date' class='datepicker1' value='"+info.SURVEY_END_DATE+"' placeholder='달력에서 날짜 선택' required disabled/>");
        appendHtml.push("<select name='survey_end_time' id='survey_end_time'></select>");
        appendHtml.push("<label for='survey_end_time'>시 까지</label>");
        appendHtml.push("</td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='use_yn'>사용여부</label></th>");
        if(info.USE_YN == 'Y'){
            appendHtml.push("<td colspan='5'><input type='checkbox' id='use_yn' checked /></td>");
        }else{
            appendHtml.push("<td colspan='5'><input type='checkbox' id='use_yn' /></td>");
        }
        appendHtml.push("</tr>");


        Elements.surveyGroupTbody.innerHTML = appendHtml.join('');

        setDatePicker();
        createSelectTimeBox("survey_start_time", info.SURVEY_START_TIME);
        createSelectTimeBox("survey_end_time", info.SURVEY_END_TIME);
    }

    function createInfoTable(response) {

        if(isNull(response)) return false;
        let appendHtml = [];
        let info = response.SURVEY_INFO;

        info.forEach(function(e, index) {
            appendHtml.push("<table class='table mt20' name='survey_info_tbl' id='survey_info_tbl"+index+"'>");
            appendHtml.push("<colgroup>");
            appendHtml.push("<col width='12%'>");
            appendHtml.push("<col width='18%'>");
            appendHtml.push("<col width='23%'>");
            appendHtml.push("<col width='18%'>");
            appendHtml.push("<col width='23%'>");
            appendHtml.push("</colgroup>");
            appendHtml.push("<tbody>");
            appendHtml.push("<tr>");
            appendHtml.push("<th rowspan='5'>설문항목</th>");
            appendHtml.push("<td><label for='qs_subject'>질문</label></td>");
            appendHtml.push("<td colspan='3'><input type='text' class='input70' id='qs_subject"+index+"' value='"+e.SURVEY_INFO_SUBJECT+"' target-key='"+e.SURVEY_INFO_KEY+"' required/>");
            appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_remove_btn' value='삭제' />");
            appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_up_btn' value='위로' />");
            appendHtml.push("<input type='button' class='btn bg_secondery' name='survey_item_down_btn' value='아래로' />");
            appendHtml.push("</td>");
            appendHtml.push("</tr>");
            e.ITEM_INFO.forEach(function (item, idx) {
                if (idx % 2 === 0) {
                    appendHtml.push("<tr>");
                }
                appendHtml.push("<td>");
                if(idx < 2) {
                    appendHtml.push("<label for='survey_item"+index+"_"+idx+"'>답변"+Number(idx+1)+"</label>");
                } else {
                    appendHtml.push("<label for='survey_item"+index+"_"+idx+"' style='margin-right: 12px;'>답변"+Number(idx+1)+"</label>");
                }
                appendHtml.push("</td>");
                appendHtml.push("<td>");
                appendHtml.push("<input type='text' class='input99' id='survey_item"+index+"_"+idx+"' value='"+replaceNull(item.SURVEY_ITEM_COMMENT)+"' target-key='"+item.SURVEY_ITEM_KEY+"' />");
                appendHtml.push("</td>");
                if (idx % 2 === 1) {
                    appendHtml.push("</tr>");
                }
            });
            appendHtml.push("</tbody>");
            appendHtml.push("</table>");
            Elements.surveyInfoDiv.innerHTML = appendHtml.join('');
        });


    }


    function getSurveyInfo() {
        commonAjax(BASE_URL + "/info/"+Elements.surveyGroupKey.value,"GET", null, true, getSurveyResult, true);
    }
    function getSurveyResult(response) {
        if(response.result === "error") {
            alert(response.msg);
            return false;
        }
        createGroupTbody(response);
        createInfoTable(response);
    }

    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click",createSurveyTemplate);
        document.addEventListener("click",function (e){
            console.log(e.target);
            if(e.target.name === "survey_item_up_btn"){
                let targetEl = e.target.parentNode.parentNode.parentNode.parentNode;
                let changeEl = targetEl.previousSibling;
                if("TABLE" === changeEl.tagName && changeEl) changeSurveyItemTarget(targetEl.querySelector("tbody"), changeEl.querySelector("tbody"));
            }else if(e.target.name === "survey_item_down_btn"){
                let targetEl = e.target.parentNode.parentNode.parentNode.parentNode;
                let changeEl = targetEl.nextSibling
                if("TABLE" === changeEl.tagName && changeEl ) changeSurveyItemTarget(targetEl.querySelector("tbody"), changeEl.querySelector("tbody"));
            }else if(e.target.name === "survey_item_remove_btn"){
                let removeHtml = e.target.parentNode.parentNode.parentNode.parentNode;
                //removeSurveyItem(removeHtml);
                removeHtml.remove();
            }else if(e.target === Elements.saveBtn) {
                saveSurveyTemplate();
            }
        })

    }

    function init() {
        if("UPDATE" === Elements.pageType.value) {
            getSurveyInfo();
        }else {
            setDatePicker();
            createSelectTimeBox("survey_start_time", null);
            createSelectTimeBox("survey_end_time", null);
        }
        setEventListener();
    }

    return {
        init
    }
})();

SurveyDetailController.init();