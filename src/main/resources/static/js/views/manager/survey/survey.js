const SurveyController = (function () {

    const BASE_URL = getContextPath() + "/manager/survey";


    const Elements = (function () {


        return {

        }
    })();


    function goAddBoard() {
        window.location.href = BASE_URL + "/add";
    }





    function setEventListener() {

    }

    function init() {
        setEventListener();

    }

    return {
        init
    }
})();

SurveyController.init();