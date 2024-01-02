package com.ping.singleproject.views.manager.survey;

import com.ping.singleproject.common.method.CommonMethod;
import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class SurveyManagerServiceImpl extends EgovAbstractServiceImpl implements SurveyManagerService {

    private final CommonValidation commonValidation;
    private final CommonMethod commonMethod;
    private final SurveyManagerDAO surveyManagerDAO;

    @Override
    public Map<String, Object> getSurveyList(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("SURVEY_INFO", this.surveyManagerDAO.getSurveyList(params));
        resultMap.put("TOTAL_CNT", this.surveyManagerDAO.getSurveyCnt(params));
        return this.commonValidation.successResult(resultMap);
    }

    @Override
    public Map<String, Object> setSurveyInfo(HttpServletRequest request, Map<String, Object> params) {
        Map<String, Object> surveyGroupInfoMap = this.commonMethod.convertJsonToMap(this.commonMethod.unescapeHtmlToString(params.get("survey_group_info").toString()));
        List<Map<String, Object>> surveyInfoList = this.commonMethod.convertJsonToList(this.commonMethod.unescapeHtmlToString(params.get("survey_info").toString()));
        Map<String, Object> validation = new HashMap<>();
        String pageType = params.get("page_type").toString();
        surveyGroupInfoMap.put("page_type", pageType);
        surveyGroupInfoMap.put("worker", "관리자");
        int groupIds = 0;
        int groupKey = 0;

        // 설문 그룹정보 입력

       if("INSERT".equals(pageType)) {
            surveyGroupInfoMap.put("first_work", "설문 정보 생성");
            groupIds = this.surveyManagerDAO.insertSurveyGroupInfo(surveyGroupInfoMap);
            if(groupIds < 1) return this.commonValidation.errorResult("설문지 설문 정보 생성에 실패했습니다.");
            groupKey = groupIds;
        }else{

        }



        //설문 정보 입력
        int infoIdx = 0;
        for(Map<String, Object> surveyInfoMap : surveyInfoList) {
            surveyInfoMap.put("page_type", pageType);
            surveyInfoMap.put("survey_info_order", infoIdx);
            surveyInfoMap.put("worker", "관리자");

            if("INSERT".equals(pageType)) {
                surveyInfoMap.put("first_work", "질문 정보 생성");
                surveyInfoMap.put("survey_group_key", groupKey);
                Map<String, Object> insertSurveyInfoMap = this.insertSurveyInfoMap(request, surveyInfoMap);
                if(insertSurveyInfoMap.get("result") == "error") return insertSurveyInfoMap;
            }




            infoIdx++;
        }


        return commonValidation.successResult(null);
    }


    private Map<String, Object> insertSurveyInfoMap(HttpServletRequest request,  Map<String, Object> map) {
        int infoKey = 0;
        int infoIds = this.surveyManagerDAO.insertSurveyInfo(map);
        if(infoIds < 1) return this.commonValidation.errorResult("설문지 질문 정보 생성에 실패했습니다.");
        infoKey = infoIds;
        for(String key : map.keySet()) {
            Map<String, Object> surveyItemMap = new HashMap<>();
            if(key.contains("ans")) {
                String regStr = key.substring(key.lastIndexOf("_"));
                String regExp = "[^0-9]";
                String[] itemSplit = map.get(key).toString().split("[|]");
                Integer survey_item_no = Integer.parseInt(regStr.replaceAll(regExp,"")) + 1;
                surveyItemMap.put("survey_info_key", infoKey);
                surveyItemMap.put("survey_item_no", Integer.toString(survey_item_no));
                surveyItemMap.put("survey_item_comment", itemSplit[0]);
                surveyItemMap.put("first_work", "설문지 답변 생성");

                int itemIds = this.surveyManagerDAO.insertSurveyItemInfo(surveyItemMap);
                if(itemIds < 1) return this.commonValidation.errorResult("설문지 답변 정보 생성에 실패했습니다.");;

            }
        }


        return this.commonValidation.successResult(null);
    }



    @Override
    public Map<String, Object> getSurveyInfo(String value) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> surveyGroupInfoMap = this.surveyManagerDAO.getSurveyGroupInfo(value);
        List<Map<String, Object>> surveyInfoList = this.surveyManagerDAO.getSurveyInfo(value);
        for(Map<String, Object> surveyInfoMap : surveyInfoList) {
            surveyInfoMap.put("ITEM_INFO", this.surveyManagerDAO.getSurveyItemInfo(surveyInfoMap.get("SURVEY_INFO_KEY").toString()));
        }
        resultMap.put("SURVEY_GROUP_INFO", surveyGroupInfoMap);
        resultMap.put("SURVEY_INFO", surveyInfoList);
        return resultMap;
    }




}
