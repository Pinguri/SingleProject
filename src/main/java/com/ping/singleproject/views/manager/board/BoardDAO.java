package com.ping.singleproject.views.manager.board;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class BoardDAO {

    @Autowired
    private SqlSessionTemplate sqlSession;
    private static final String NAME_SPACE = "BOARD.";

   public int insertBoardInfo(Map<String, Object> params) {
        return sqlSession.insert(NAME_SPACE + "INSERT_NOTICE_INFO", params);
    }

}
