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

    @GetMapping(value = "/search")
    public ResponseEntity<Map<String, Object>> getSurveyList(@RequestParam Map<String, Object> params) {
        try {
            return ResponseEntity.ok().body(this.surveyManagerService.getSurveyList(params));
        } catch (Exception e) {
            log.error("GET SURVEY LIST ERROR : >> " + e);
            return this.commonValidation.badRequest("통신 에러가 발생했습니다." +
                    "\n현상이 지속되는 경우 관리자에게 문의해주시기바랍니다.");
        }
    }

    @GetMapping(value="/add")
    public ModelAndView SurveyAddPage() {
        return new ModelAndView("/manager/survey/survey-detail.bd")
                .addObject("PAGE_TYPE", "INSERT");
    }
    @GetMapping(value="/detail/{key}")
    public ModelAndView mvSurveyMngDetailPage(@PathVariable("key") String key) {
        return new ModelAndView("/manager/survey/survey-detail.bd")
                .addObject("PAGE_TYPE", "UPDATE")
                .addObject("SURVEY_GROUP_KEY", key);
    }
    @GetMapping(value="/info/{group_info_key}")
    public ResponseEntity<Map<String, Object>> getSurveyInfo(@PathVariable("group_info_key") String groupInfoKey) {
        try {
            return ResponseEntity.ok().body(this.surveyManagerService.getSurveyInfo(groupInfoKey));
        } catch (Exception e) {
            log.error("GET SURVEY INFO ERROR >> : " + e);
            return this.commonValidation.badRequest("통신 에러가 발생했습니다." +
                    "\n현상이 지속되는 경우 관리자에게 문의해주시기바랍니다.");
        }
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
