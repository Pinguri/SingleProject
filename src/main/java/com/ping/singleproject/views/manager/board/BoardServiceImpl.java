package com.ping.singleproject.views.manager.board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService {

    private final BoardDAO boardDAO;

    @Override
    public Map<String, Object> insertBoardInfo(Map<String, Object> params, HttpServletRequest request) {
        return this.boardInfoTransactionMng(params, "INSERT", request);
    }

    public Map<String, Object> boardInfoTransactionMng(Map<String, Object> params, String jobType, HttpServletRequest req) {
        Map<String, Object> resultMap = new HashMap<>();
        return resultMap;
    }





}
