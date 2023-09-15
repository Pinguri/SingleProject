const BoardController = (function () {

    const BASE_URL = getContextPath() + "/manager/board";


    const Elements = (function () {
        const addBoardBtn = document.getElementById("add_board_btn");

        return {
            addBoardBtn
        }
    })();


    function goAddBoard() {
        window.location.href = BASE_URL + "/add";
    }


    function setEventListener() {
        Elements.addBoardBtn.addEventListener("click", goAddBoard);
    }

    function init() {
        setEventListener();
    }

    return {
        init
    }
})();

BoardController.init();