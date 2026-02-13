package com.skillsync.skillsync.api;

import com.skillsync.skillsync.ai.AiAnalyzeService;
import com.skillsync.skillsync.ai.dto.AiAnalyzeResponse;
import com.skillsync.skillsync.api.dto.MatchRequest;
import com.skillsync.skillsync.api.dto.MatchResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class MatchService {

    private final AiAnalyzeService aiAnalyzeService;

    public MatchService(AiAnalyzeService aiAnalyzeService) {
        this.aiAnalyzeService = aiAnalyzeService;
    }

    public MatchResponse createMatch(MatchRequest req) {
        AiAnalyzeResponse ai = aiAnalyzeService.analyze(req.getResumeText(), req.getJobText());

        return new MatchResponse(
                UUID.randomUUID().toString(),
                ai.getScore(),
                ai.getMatchedSkills(),
                ai.getMissingSkills(),
                Instant.now());
    }
}
