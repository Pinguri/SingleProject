package com.ping.singleproject.common.validation;

import com.ping.singleproject.common.message.ResultCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

}
