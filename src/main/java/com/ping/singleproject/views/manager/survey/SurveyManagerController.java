package com.ping.singleproject.views.manager.survey;


import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/manager/survey")
@Slf4j
@RequiredArgsConstructor
public class SurveyManagerController {

    private final SurveyManagerService surveyService;

    private final CommonValidation commonValidation;

    @GetMapping(value = "")
    public ModelAndView SurveyMainPage(){
        return new ModelAndView("/manager/survey/survey.bd");
    }

    @GetMapping(value="/add")
    public ModelAndView SurveyAddPage() {
        return new ModelAndView("/manager/survey/survey-detail.bd")
                .addObject("PAGE_TYPE", "INSERT");
    }

}
