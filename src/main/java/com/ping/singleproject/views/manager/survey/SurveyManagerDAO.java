package com.ping.singleproject.views.manager.survey;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class SurveyManagerDAO extends EgovAbstractMapper  {
    private static final String NAME_SPACE = "SURVEY.";

    public int insertSurveyGroupInfo(Map<String, Object> params) {
        insert(NAME_SPACE + "INSERT_SURVEY_GROUP_INFO", params);
        return (Integer) params.get("survey_group_key");
    }
    public int insertSurveyInfo(Map<String, Object> params) {
        insert(NAME_SPACE + "INSERT_SURVEY_INFO", params);
        return (Integer) params.get("survey_info_key");
    }


}
