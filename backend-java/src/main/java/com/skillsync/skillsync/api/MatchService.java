package com.skillsync.skillsync.api;

import com.skillsync.skillsync.ai.AiAnalyzeService;
import com.skillsync.skillsync.ai.dto.AiAnalyzeResponse;
import com.skillsync.skillsync.api.dto.MatchRequest;
import com.skillsync.skillsync.api.dto.MatchResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class MatchService {
    private final AiAnalyzeService aiAnalyzeService;

    public MatchService(AiAnalyzeService aiAnalyzeService) {
        this.aiAnalyzeService = aiAnalyzeService;
    }

    public MatchResponse createMatch(MatchRequest req) {
        AiAnalyzeResponse ai = aiAnalyzeService.analyze(req.getResumeText(), req.getJobText());
        List<String> matched = nonNullList(ai.getMatchedSkills());
        List<String> missing = nonNullList(ai.getMissingSkills());
        List<String> suggestions = nonNullList(ai.getSuggestions());
        return new MatchResponse(
                UUID.randomUUID().toString(),
                ai.getScore(),
                matched,
                missing,
                suggestions,
                Instant.now());
    }

    public List<MatchResponse> getAllMatches() {
        return List.of();
    }

    private static List<String> nonNullList(List<String> list) {
        return list != null ? list : List.of();
    }
}
