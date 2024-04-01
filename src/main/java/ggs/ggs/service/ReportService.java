package ggs.ggs.service;

import org.springframework.data.domain.Page;

public interface ReportService {
    Boolean report(Integer idx, String sid);

    int reportNum(Integer idx);

    Page<Object> reportList(String sid, int page);

}
