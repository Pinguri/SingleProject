package com.ping.singleproject.views.manager.survey;

import com.ping.singleproject.common.validation.CommonValidation;
import com.ping.singleproject.views.manager.board.BoardDAO;
import com.ping.singleproject.views.manager.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class SurveyServiceImpl extends EgovAbstractServiceImpl implements SurveyService {

    private final CommonValidation commonValidation;
    private final SurveyDAO surveyDAO;



}
