package com.skillsync.skillsync.api;

import com.skillsync.skillsync.api.dto.MatchRequest;
import com.skillsync.skillsync.api.dto.MatchResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    public ResponseEntity<MatchResponse> create(@Valid @RequestBody MatchRequest request) {
        return ResponseEntity.ok(matchService.createMatch(request));
    }
}
