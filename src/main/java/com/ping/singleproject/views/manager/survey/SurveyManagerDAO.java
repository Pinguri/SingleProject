package com.ping.singleproject.views.manager.survey;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SurveyManagerDAO extends EgovAbstractMapper  {
    private static final String NAME_SPACE = "SURVEY.";

    public List<Map<String, Object>> getSurveyList(Map<String, Object> params) {
        return selectList(NAME_SPACE + "GET_SURVEY_LIST", params);
    }
    public int getSurveyCnt(Map<String, Object> params) {
        return selectOne(NAME_SPACE + "GET_SURVEY_CNT", params);
    }
    public int insertSurveyGroupInfo(Map<String, Object> params) {
        insert(NAME_SPACE + "INSERT_SURVEY_GROUP_INFO", params);
        return (Integer) params.get("survey_group_key");
    }
    public int insertSurveyInfo(Map<String, Object> params) {
        insert(NAME_SPACE + "INSERT_SURVEY_INFO", params);
        return (Integer) params.get("survey_info_key");
    }

    public int insertSurveyItemInfo(Map<String, Object> params) {
        return insert(NAME_SPACE + "INSERT_SURVEY_ITEM_INFO", params);
    }

    public Map<String, Object> getSurveyGroupInfo(String value) {
        return selectOne(NAME_SPACE + "GET_SURVEY_GROUP_INFO", value);
    }
    public List<Map<String, Object>> getSurveyInfo(String value) {
        return selectList(NAME_SPACE + "GET_SURVEY_INFO", value);
    }
    public List<Map<String, Object>> getSurveyItemInfo(String value) {
        return selectList(NAME_SPACE + "GET_SURVEY_ITEM_INFO", value);
    }
}
