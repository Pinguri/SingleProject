package com.ping.singleproject.views.manager.board;


import com.ping.singleproject.common.validation.CommonValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(value = "/manager/board")
@Slf4j
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    private final CommonValidation commonValidation;

    @GetMapping(value = "")
    public ModelAndView BoardMainPage(){
        return new ModelAndView("/manager/board/board.bd");
    }

    @GetMapping(value="/add")
    public ModelAndView BoardAddPage() {
        return new ModelAndView("/manager/board/board_detail.bd")
                .addObject("PAGE_TYPE", "INSERT");
    }

    @PutMapping(value = "/info")
    public ResponseEntity<Map<String, Object>> addBoard(@RequestParam Map<String, Object> params, HttpServletRequest request){
        try {
            return ResponseEntity.ok().body(this.boardService.insertBoardInfo(params, request));
        }catch (Exception e){
            e.printStackTrace();
            return this.commonValidation.badRequest("게시판 등록에 실패했습니다.");
        }

    }

}
