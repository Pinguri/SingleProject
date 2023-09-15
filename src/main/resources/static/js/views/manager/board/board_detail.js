const BoardController = (function () {

    const BASE_URL = getContextPath() + "/manager/board";

    
    const Elements = (function () {
        const saveBtn = document.getElementById("save_btn");
        const boardTitle = document.getElementById("board_title");
        const boardContent = document.getElementById("board_content");
        return {
            saveBtn,
            boardTitle,
            boardContent
        }
    })();


    function insertBoardFunction(){
        let dataObject = {};
        dataObject.boardTitle = Elements.boardTitle.value;
        dataObject.boardContent = Elements.boardContent.value;

        commonAjax(BASE_URL + "/info", "PUT", dataObject, true, function (){}, true);

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