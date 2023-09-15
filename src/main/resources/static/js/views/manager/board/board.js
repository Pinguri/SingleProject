const BoardController = (function () {

    const BASE_URL = getContextPath() + "/manager/board";


    const Elements = (function () {
        const addBoardBtn = document.getElementById("add_board_btn");
        const boardTbody = document.getElementById("board_tbody");

        return {
            addBoardBtn,
            boardTbody
        }
    })();


    function goAddBoard() {
        window.location.href = BASE_URL + "/add";
    }


    function createBoardList(response) {
        let targetHtml = Elements.boardTbody;
        let htmlBody = [];

        response.board_list.forEach(function (e) {
            htmlBody.push("<tr>");
            htmlBody.push("<td>" + replaceNull(e.BOARD_KEY) + "</td>");
            htmlBody.push("<td>" + replaceNull(e.TITLE) + "</td>");
            htmlBody.push("<td>" + replaceNull(e.CREATE_DATE) + "</td>");
            htmlBody.push("</tr>");
        });
        targetHtml.innerHTML = htmlBody.join('');

    }

    function boardSearch(){
        commonAjax(BASE_URL + "/search", "GET", null, true, createBoardList, true);
    }

    function setEventListener() {
        Elements.addBoardBtn.addEventListener("click", goAddBoard);
    }

    function init() {
        setEventListener();
        boardSearch();
    }

    return {
        init
    }
})();

BoardController.init();