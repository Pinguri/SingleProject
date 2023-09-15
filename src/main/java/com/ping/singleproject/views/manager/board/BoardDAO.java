package com.ping.singleproject.views.manager.board;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class BoardDAO extends EgovAbstractMapper  {
    private static final String NAME_SPACE = "BOARD.";

   public int insertBoardInfo(Map<String, Object> params) {
        return insert(NAME_SPACE + "INSERT_BOARD_INFO", params);
    }

}
