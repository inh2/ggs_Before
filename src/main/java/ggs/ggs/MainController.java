package ggs.ggs;

import ggs.ggs.board.BoardService;
import ggs.ggs.dto.BoardDto;
import ggs.ggs.dto.GoodsDto;
import ggs.ggs.goods.GoodsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
@Controller
@RequiredArgsConstructor
public class MainController {

    @Autowired
    @Qualifier("boardServiceImpl")
    private final BoardService boardService;

    @Autowired
    @Qualifier("goodsServiceImpl")
    private final GoodsService goodsService;

    @GetMapping("/")
    public String home(@RequestParam(name = "pageScroll", defaultValue = "defaultScroll") String pageScroll,
            Model model, @RequestParam(value = "category", defaultValue = "0") Integer category,
            @RequestParam(value = "cate", defaultValue = "all") String cate,
            @RequestParam(value = "bsort", defaultValue = "new") String bsort,
            Authentication authentication) {

        List<BoardDto> boardList = boardService.getAllBoard(cate, bsort);
        List<GoodsDto> goods;
        System.out.println("하이"+boardList);
        if (authentication != null && authentication.isAuthenticated()) {
            goods = goodsService.findAll(category, authentication.getName());
        } else {
            goods = goodsService.findAll(category);
        }
        model.addAttribute("boardList", boardList);
        model.addAttribute("cate",cate);
        model.addAttribute("category", category);
        model.addAttribute("goods", goods);
        model.addAttribute("pageScroll", "pageScroll");
        model.addAttribute("mainCheck", "main");

        return "home";
    }


}