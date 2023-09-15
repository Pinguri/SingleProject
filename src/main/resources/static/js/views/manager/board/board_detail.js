const BoardController = (function () {

    const BASE_URL = getContextPath() + "/manager/board";

    
    const Elements = (function () {
        const saveBtn = document.getElementById("save_btn");
        const title = document.getElementById("title");
        const content = document.getElementById("content");
        return {
            saveBtn,
            title,
            content
        }
    })();


    function insertBoardFunction(){
        let dataObject = {};
        dataObject.title = Elements.title.value;
        dataObject.content = Elements.content.value;

        commonAjax(BASE_URL + "/info", "PUT", dataObject, true, insertBoardAfter, true);

    }

    function insertBoardAfter(response){
        if (response.result === "error") {
            alert(response.msg);
            return false;
        } else {
            window.location.href = BASE_URL;
        }
    }

    function setEventListener() {
        Elements.saveBtn.addEventListener("click", insertBoardFunction);
    }

    function init() {
        setEventListener();
    }

    return {
        init
    }
})();

BoardController.init();