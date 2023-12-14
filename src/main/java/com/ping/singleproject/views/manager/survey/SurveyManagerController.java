package com.ping.singleproject.views.manager.survey;


import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(value = "/manager/survey")
@Slf4j
@RequiredArgsConstructor
public class SurveyManagerController {

    private final SurveyManagerService surveyManagerService;

    private final CommonValidation commonValidation;

    @GetMapping(value = "/main")
    public ModelAndView SurveyMainPage(){
        return new ModelAndView("/manager/survey/survey.bd");
    }

    @GetMapping(value="/add")
    public ModelAndView SurveyAddPage() {
        return new ModelAndView("/manager/survey/survey-detail.bd")
                .addObject("PAGE_TYPE", "INSERT");
    }
    @PutMapping(value="/info")
    public ResponseEntity<Map<String, Object>> setSurveyInfo(HttpServletRequest request, @RequestParam Map<String, Object> params) {
        try {
            return ResponseEntity.ok().body(this.surveyManagerService.setSurveyInfo(request, params));
        } catch (Exception e) {
            log.error("SURVEY INSERT ERROR : >> " + e);
            return this.commonValidation.badRequest("통신 에러가 발생했습니다." +
                    "\n현상이 지속되는 경우 관리자에게 문의해주시기바랍니다.");
        }
    }


}
