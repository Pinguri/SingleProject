const SurveyController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {
        const addSurveyBtn = document.getElementById("add_survey_btn");

        return {
            addSurveyBtn
        }
    })();


    function goAddSurvey() {
        window.location.href = BASE_URL + "/add";
    }





    function setEventListener() {
        Elements.addSurveyBtn.addEventListener("click", goAddSurvey);
    }

    function init() {
        setEventListener();

    }

    return {
        init
    }
})();

SurveyController.init();