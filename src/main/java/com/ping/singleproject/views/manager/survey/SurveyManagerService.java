package com.ping.singleproject.views.manager.survey;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface SurveyManagerService {
    Map<String, Object> setSurveyInfo(HttpServletRequest request, Map<String, Object> params);

}
