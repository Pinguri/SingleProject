package com.ping.singleproject.common.validation;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CommonValidation {

    Map<String, Object> errorResult(String errorMsg);
    ResponseEntity<Map<String, Object>> badRequest(String errorMsg);

}
