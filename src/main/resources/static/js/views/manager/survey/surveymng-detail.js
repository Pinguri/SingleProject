const SurveyDetailController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {
        const addSurveyBtn = document.getElementById("add_survey_btn");
        const surveyInfoTbl = document.getElementById("survey_info_tbl");
        const lastHtml = ""
        return {
            addSurveyBtn,
            surveyInfoTbl,
            lastHtml
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
        appendHtml.push("<th rowspan='7'>설문항목 - " + index  + "</th>");
        appendHtml.push("<th><label for='sub'>질문</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='sub'/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='ans0'>답변1</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='ans1'/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='ans1'>답변2</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='ans1'/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='ans0'>답변3</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='ans1'/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='ans0'>답변4</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='ans1'/></td>");
        appendHtml.push("</tr>");
        appendHtml.push("<tr>");
        appendHtml.push("<th><label for='ans0'>답변5</label></th>");
        appendHtml.push("<td><input type='text' class='input99' id='ans1'/></td>");
        appendHtml.push("</tr>");
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
    function changeSurveyItemTarget(el,changeEl){

        let elParentNode = el.parentNode;
        let changeElParentNode = changeEl.parentNode;

        console.log(changeEl);

        let cloneEl = el.cloneNode(true);
        let cloneChangeEl = changeEl.cloneNode(true);


        el.remove();
        changeEl.remove();

        elParentNode.appendChild(cloneEl);
        changeElParentNode.appendChild(cloneChangeEl);



    }

    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click",createSurveyTemplate);
        document.addEventListener("click",function (e){
            if(e.target.name === "survey_item_up_btn"){
                let el = e.target.parentNode.parentNode.parentNode.parentNode;
                let changeEl = el.previousSibling;
                if("TABLE" === changeEl.tagName ) changeSurveyItemTarget(el, changeEl);
            }else if(e.target.name === "survey_item_down_btn"){

            }else if(e.target.name === "survey_item_remove_btn"){

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