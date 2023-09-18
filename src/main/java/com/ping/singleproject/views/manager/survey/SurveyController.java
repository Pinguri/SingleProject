package com.ping.singleproject.views.manager.survey;


import com.ping.singleproject.common.validation.CommonValidation;
import com.ping.singleproject.views.manager.board.BoardService;
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
public class SurveyController {

    private final SurveyService surveyService;

    private final CommonValidation commonValidation;

    @GetMapping(value = "")
    public ModelAndView SurveyMainPage(){
        return new ModelAndView("/manager/survey/survey.bd");
    }


}
