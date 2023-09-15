package com.ping.singleproject.views.manager.board;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface BoardService {

    Map<String, Object> insertBoardInfo(Map<String, Object> params, HttpServletRequest request);
    Map<String, Object> getBoardList();

}
