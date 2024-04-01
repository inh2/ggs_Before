package ggs.ggs.dto;

import java.time.LocalDateTime;

import ggs.ggs.domain.Board;
import ggs.ggs.domain.Member;
import ggs.ggs.domain.MiddleTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.ssl.SslProperties.Bundles.Watch.File;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long idx;
    private String title;
    private String detail;
    private String nickname;
    private Integer memberidx;
    private int viewcount;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String category;
    private String outerwear;
    private String top;
    private String bottom;
    private String shoes;
    private String acc;
    private int likesCount;
    private int reportCount;

    private List<ReplyDto> replydtos;

    private List<String> hashtags = new ArrayList<>();// 해시태그를 저장할 필드 추가

    private List<String> imageUrls = new ArrayList<>(); // 이미지 URL을 저장할 필드

    public BoardDto(Board board) {
        this.idx = board.getIdx();
        this.title = board.getTitle();
        this.detail = board.getDetail();
        this.memberidx = board.getMember().getIdx();
        this.nickname = board.getMember().getNick();
        this.viewcount = board.getViewcount();
        this.createdDate = board.getCreatedDate();
        this.modifiedDate = board.getModifiedDate();
        this.category = board.getCategory();
        this.outerwear = board.getOuterwear();
        this.bottom = board.getBottom();
        this.top = board.getTop();
        this.acc = board.getAcc();
        this.shoes = board.getShoes();
        this.likesCount = board.getLikesCount();
        this.reportCount = board.getReportCount();
        if (board.getReplies() != null) {
            this.replydtos = board.getReplies().stream()
                    .map(reply -> new ReplyDto().from(reply))
                    .collect(Collectors.toList());
        }
    }

    public Board toEntity(Member member) {
        return Board.builder()
                .title(this.title)
                .detail(this.detail)
                .category(this.category)
                .outerwear(this.outerwear)
                .bottom(this.bottom)
                .top(this.top)
                .acc(this.acc)
                .shoes(this.shoes)
                .member(member) // Member 설정
                .build();
    }

    public static BoardDto convertToDto(Board board) {
        BoardDto dto = new BoardDto(board);
        // MiddleTag를 통해 해시태그 리스트 가져오기
        List<String> hashtags = board.getMiddleTags().stream()
                .map(MiddleTag::getHashtagName)
                .collect(Collectors.toList());
        dto.setHashtags(hashtags);
        return dto;
    }

}