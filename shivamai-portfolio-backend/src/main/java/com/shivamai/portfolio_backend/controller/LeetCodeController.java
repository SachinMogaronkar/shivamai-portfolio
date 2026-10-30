
package com.shivamai.portfolio_backend.controller;

import com.shivamai.portfolio_backend.dto.LeetCodeStatsResponse;
import com.shivamai.portfolio_backend.service.LeetCodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leetcode")
public class LeetCodeController {

    private final LeetCodeService leetCodeService;

    public LeetCodeController(LeetCodeService leetCodeService) {
        this.leetCodeService = leetCodeService;
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {

        try {
            LeetCodeStatsResponse stats =
                    leetCodeService.getUserStats();

            return ResponseEntity.ok(stats);

        } catch (Exception exception) {

            return ResponseEntity
                    .status(503)
                    .body(java.util.Map.of(
                            "success", false,
                            "message", "LeetCode statistics are temporarily unavailable."
                    ));
        }
    }
}
