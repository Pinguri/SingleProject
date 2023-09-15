package com.ping.singleproject.common.validation;

import com.ping.singleproject.common.message.ResultCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommonValidationImpl implements CommonValidation {
    @Override
    public Map<String, Object> errorResult(String errorMsg) {
        Map<String, Object> errorResultMap = new HashMap<>();
        errorResultMap.put(ResultCode.RESULT, ResultCode.ERROR);
        errorResultMap.put(ResultCode.MSG, errorMsg);
        return errorResultMap;
    }
    @Override
    public ResponseEntity<Map<String, Object>> badRequest(final String errorMsg) {
        return ResponseEntity.badRequest().body(this.errorResult(errorMsg));
    }

    @Override
    public Map<String, Object> successResult(Map<String, Object> resultData) {
        Map<String, Object> successResultMap = this.isNull(resultData) ? new HashMap<>() : resultData;
        successResultMap.put(ResultCode.RESULT, ResultCode.SUCCESS);
        return successResultMap;
    }

    @Override
    public boolean isNull(Object obj) {
        if(obj != null) {
            if( obj instanceof String) {
                return obj.toString().trim().length() < 1;
            } else if ( obj instanceof Object[] ) {
                return Array.getLength(obj) == 0;
            } else if ( obj instanceof List) {
                return ((List<?>) obj).isEmpty();
            } else if ( obj instanceof Map) {
                return ((Map<?, ?>) obj).isEmpty();
            } else {
                return false;
            }
        }
        return true;
    }

}
