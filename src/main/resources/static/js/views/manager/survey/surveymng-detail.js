const SurveyDetailController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {
        const lastHtml = ""
        const addSurveyBtn = document.getElementById("add_survey_btn");
        const surveyInfoTbl = document.getElementById("survey_info_tbl")
        const removeInfoList = [];
        const saveBtn = document.getElementById("save_btn");
        const moveBackBtn = document.getElementById("move_back_btn");
        const surveyGroupSubjectTbl = document.getElementById("survey_group_subject_tbl");

        return {
            lastHtml,
            addSurveyBtn,
            surveyInfoTbl,
            removeInfoList,
            saveBtn,
            moveBackBtn,
            surveyGroupSubjectTbl
        }
    })();



    /* 달력 생성 */
    function setDatePicker() {
        new CommonDatepicker("#survey_start_date", { id: "datepicker" });
        new CommonDatepicker("#survey_end_date", { id: "datepicker" });
    }


    function createSurveyTemplate(){

        let appendHtml = [];
        let index = Number(document.getElementsByName("survey_info_tbl").length) + 1;

        appendHtml.push("<table class='main_tbl' name='survey_info_tbl' id='survey_info_tbl_" + index + "'>");
        appendHtml.push("<colgroup>");
        appendHtml.push("<col width='15%'>");
        appendHtml.push("<col width='25%'>");
        appendHtml.push("<col width='60%'>");
        appendHtml.push("</colgroup");
        appendHtml.push("<tbody>");
        appendHtml.push("<tr>");
        appendHtml.push("<th rowspan='8'>설문항목</th>");
        appendHtml.push("<th><label for='qs_subject_"+index+"'>질문</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='qs_subject_"+index+"'/></td>");
        appendHtml.push("</tr>");
        for(let i =0; i<6; i++){
            appendHtml.push("<tr>");
            appendHtml.push("<th><label for='qs_ans_"+index+"_"+i+"'>답변"+Number(i+1)+"</label></th>");
            appendHtml.push("<td><input type='text' class='input99' id='qs_ans_"+index+"_"+i+"'/></td>");
            appendHtml.push("</tr>");
        }
        appendHtml.push("<tr>");
        appendHtml.push("<td colspan='3' style='text-align: right;'>");
        appendHtml.push("<input type='button' name='survey_item_remove_btn' class='survey_item_btn' value='삭제'/>");
        appendHtml.push("<input type='button' name='survey_item_up_btn' class='survey_item_btn' value='위로'/>");
        appendHtml.push("<input type='button' name='survey_item_down_btn' class='survey_item_btn' value='아래로'/>");
        appendHtml.push("</td>");
        appendHtml.push("</tr>");
        appendHtml.push("</tbody>")
        appendHtml.push("</table>")


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


        dataObject.qs_group_info = JSON.stringify(questionGroupObject);
        dataObject.qs_info = convertResponseData();
        dataObject.page_type = Elements.pageType.value;
        commonAjax(BASE_URL + "/info", "PUT", dataObject, true, saveQuestionResult, true);
    }


    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click",createSurveyTemplate);
        document.addEventListener("click",function (e){
            if(e.target.name === "survey_item_up_btn"){
                let targetEl = e.target.parentNode.parentNode.parentNode.parentNode;
                let changeEl = targetEl.previousSibling;
                if("TABLE" === changeEl.tagName ) changeSurveyItemTarget(targetEl.querySelector("tbody"), changeEl.querySelector("tbody"));
            }else if(e.target.name === "survey_item_down_btn"){
                let targetEl = e.target.parentNode.parentNode.parentNode.parentNode;
                let changeEl = targetEl.nextSibling
                if("TABLE" === changeEl.tagName ) changeSurveyItemTarget(targetEl.querySelector("tbody"), changeEl.querySelector("tbody"));
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
        setEventListener();
        setDatePicker();
    }

    return {
        init
    }
})();

SurveyDetailController.init();