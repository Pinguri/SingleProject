package com.ping.singleproject.views.manager.board;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BoardDAO extends EgovAbstractMapper  {
    private static final String NAME_SPACE = "BOARD.";

   public int insertBoardInfo(Map<String, Object> params) {
        return insert(NAME_SPACE + "INSERT_BOARD_INFO", params);
   }

   public List<Map<String, Object>> getBoardList(){
        return selectList(NAME_SPACE + "GET_BOARD_LIST");
   }


}
