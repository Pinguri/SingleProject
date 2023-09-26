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

        appendHtml.push("<table class='main_tbl' name='survey_info_tbl'>");
        appendHtml.push("<colgroup>");
        appendHtml.push("<col width='15%'>");
        appendHtml.push("<col width='25%'>");
        appendHtml.push("<col width='60%'>");
        appendHtml.push("</colgroup");
        appendHtml.push("<tbody>");
        appendHtml.push("<tr>");
        appendHtml.push("<th rowspan='6'>설문항목 - " + index + "</th>");
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
        appendHtml.push("</tbody>")
        appendHtml.push("</table>")


        Elements.lastHtml = document.getElementsByName("survey_info_tbl")[document.getElementsByName("survey_info_tbl").length-1];
        Elements.lastHtml.insertAdjacentHTML("afterend", appendHtml.join(''));


    }



    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click",createSurveyTemplate)
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