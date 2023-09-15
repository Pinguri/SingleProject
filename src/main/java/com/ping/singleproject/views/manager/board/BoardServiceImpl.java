package com.ping.singleproject.views.manager.board;

import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardServiceImpl extends EgovAbstractServiceImpl implements BoardService {

    private final CommonValidation commonValidation;
    private final BoardDAO boardDAO;

    @Override
    public Map<String, Object> insertBoardInfo(Map<String, Object> params, HttpServletRequest request) {
        return this.boardInfoTransactionMng(params, "INSERT", request);
    }

    @Override
    public Map<String, Object> getBoardList() {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("board_list",this.boardDAO.getBoardList());
        return this.commonValidation.successResult(resultMap);
    }

    public Map<String, Object> boardInfoTransactionMng(Map<String, Object> params, String jobType, HttpServletRequest req) {
        Map<String, Object> resultMap = new HashMap<>();


        if ("INSERT".equals(jobType)) {
            params.put("worker", req.getSession().getAttribute("_MANAGER_ID_"));
            this.boardDAO.insertBoardInfo(params);
        }

        return this.commonValidation.successResult(resultMap);
    }





}
