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


    function addBoardFunction(){
        let dataObject = {};
        dataObject.boardTitle = Elements.boardTitle.value;
        dataObject.boardContent = Elements.boardContent.value;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', BASE_URL + '/add', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send("id=post_ajax");
        xhr.onload = function () {
            if (xhr.status == 200) {
                alert("gd");
            } else {
            }
        }

    }


    function setEventListener() {
        Elements.saveBtn.addEventListener("click", addBoardFunction);
    }

    function init() {
        setEventListener();
    }

    return {
        init
    }
})();

BoardController.init();