package com.ping.singleproject.common.method;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringEscapeUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class CommonMethodImpl extends EgovAbstractServiceImpl implements CommonMethod {
    private final CommonValidation commonValidation;
    @Override
    public Map<String, Object> convertJsonToMap(String jsonData) {
        if(this.commonValidation.isNull(jsonData)) return null;
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> resultMap;

        try {
            resultMap = mapper.readValue(jsonData, new TypeReference<>() {});
        } catch (IOException e) {
            log.error("CONVERT JSON STRING TO MAP ERROR : ", e);
            return null;
        }
        return resultMap;
    }

    @Override
    public List<Map<String, Object>> convertJsonToList (String jsonData) {
        if(this.commonValidation.isNull(jsonData)) return null;
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        try {
            resultList = mapper.readValue(jsonData, new TypeReference<List<Map<String, Object>>>() {});
        } catch (Exception e) {
            log.error("CONVERT JSON STRING TO LIST ERROR : >> " + e);
        }
        return resultList;
    }

    @Override
    public String unescapeHtmlToString(final Object value) {
        String temp = value == null ? "" : value.toString();
        if (temp.length() > 0) {
            temp = StringEscapeUtils.unescapeHtml4(temp);
        }
        return temp;
    }


}
