package com.ping.singleproject.views.board;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/board")
@Slf4j
@RequiredArgsConstructor
public class BoardController {

    @GetMapping(value = "")
    public ModelAndView MainPage(){
        return new ModelAndView("/board.bd");
    }

}
