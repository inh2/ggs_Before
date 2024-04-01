package ggs.ggs.service;

import ggs.ggs.domain.Board;
import ggs.ggs.domain.Hashtag;
import ggs.ggs.dto.HashtagCountDto;

import java.util.*;

public interface HashtagService {
    Hashtag createHashtag(String hashtag, Board board);

    List<Hashtag> getAllHashtags();

    List<Hashtag> getHashtagsByBoard(Board board);

    void updateHashtags(List<String> newHashtags, Board board);

    List<HashtagCountDto> getTop7Hashtags();
}
