package com.ping.singleproject.views.manager.survey;

import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class SurveyManagerServiceImpl extends EgovAbstractServiceImpl implements SurveyManagerService {

    private final CommonValidation commonValidation;
    private final SurveyManagerDAO surveyDAO;



}
