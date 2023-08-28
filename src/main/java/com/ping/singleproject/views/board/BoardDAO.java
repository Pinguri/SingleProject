package com.ping.singleproject.views.board;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class BoardDAO extends EgovAbstractServiceImpl {

    private static final String NAME_SPACE = "BOARD.";

    public int insertBoardInfo(Map<String, Object> params) {
        return insert(NAME_SPACE + "INSERT_NOTICE_INFO", params);
    }

}
