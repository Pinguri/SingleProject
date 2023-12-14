package com.ping.singleproject.common.method;


import java.util.List;
import java.util.Map;

public interface CommonMethod {
    Map<String, Object> convertJsonToMap(String jsonData);
    List<Map<String, Object>> convertJsonToList(String jsonData);
    //html tag 변환
    String unescapeHtmlToString(final Object value);
}
