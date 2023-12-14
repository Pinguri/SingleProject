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
    private final SurveyManagerDAO surveyDAO;


    @Override
    public Map<String, Object> setSurveyInfo(HttpServletRequest request, Map<String, Object> params) {
        Map<String, Object> qsGroupInfoMap = this.commonMethod.convertJsonToMap(this.commonMethod.unescapeHtmlToString(params.get("qs_group_info").toString()));
        List<Map<String, Object>> qsInfoList = this.commonMethod.convertJsonToList(this.commonMethod.unescapeHtmlToString(params.get("qs_info").toString()));
        Map<String, Object> validation = new HashMap<>();
        String pageType = params.get("page_type").toString();
        qsGroupInfoMap.put("page_type", pageType);

        if("INSERT".equals(pageType)) {
            /* QS GROUP INSERT */
/*            qsGroupInfoMap.put("first_work", "설문 정보 생성");
            groupIds = this.surveyMngDAO.insertQSGroupInfo(qsGroupInfoMap);
            if(groupIds < 1) return this.chaeumValidation.errorResult("설문지 설문 정보 생성에 실패했습니다.");
            groupKey = groupIds;*/
        }else{

        }

        return null;
    }
}
