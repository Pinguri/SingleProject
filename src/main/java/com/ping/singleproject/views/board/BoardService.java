package com.ping.singleproject.views.board;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface BoardService {

    Map<String, Object> insertBoardInfo(Map<String, Object> params, HttpServletRequest request);

}
