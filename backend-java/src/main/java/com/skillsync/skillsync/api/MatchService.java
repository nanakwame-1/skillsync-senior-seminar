package com.skillsync.skillsync.api;

import com.skillsync.skillsync.ai.AiAnalyzeService;
import com.skillsync.skillsync.ai.dto.AiAnalyzeResponse;
import com.skillsync.skillsync.api.dto.MatchRequest;
import com.skillsync.skillsync.api.dto.MatchResponse;
import com.skillsync.skillsync.model.MatchResult;
import com.skillsync.skillsync.repository.MatchResultRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MatchService {
    private final AiAnalyzeService aiAnalyzeService;
    private final MatchResultRepository matchResultRepository;

    public MatchService(AiAnalyzeService aiAnalyzeService, MatchResultRepository matchResultRepository) {
        this.aiAnalyzeService = aiAnalyzeService;
        this.matchResultRepository = matchResultRepository;
    }

    public MatchResponse createMatch(MatchRequest req) {
        AiAnalyzeResponse ai = aiAnalyzeService.analyze(req.getResumeText(), req.getJobText());
        List<String> matched = nonNullList(ai.getMatchedSkills());
        List<String> missing = nonNullList(ai.getMissingSkills());
        List<String> suggestions = nonNullList(ai.getSuggestions());
        MatchResult entity = new MatchResult();
        entity.setUserEmail(req.getUserEmail());
        entity.setResumeText(req.getResumeText());
        entity.setJobText(req.getJobText());
        entity.setScore(ai.getScore());
        entity.setMatchedSkills(String.join(",", matched));
        entity.setMissingSkills(String.join(",", missing));
        entity.setSuggestions(String.join("\n", suggestions));
        MatchResult saved = matchResultRepository.save(entity);
        return new MatchResponse(
                saved.getId().toString(),
                saved.getScore(),
                matched,
                missing,
                suggestions,
                saved.getCreatedAt());
    }

    public List<MatchResponse> getAllMatches() {
        return matchResultRepository.findAll()
                .stream()
                .map(saved -> new MatchResponse(
                        saved.getId().toString(),
                        saved.getScore(),
                        splitComma(saved.getMatchedSkills()),
                        splitComma(saved.getMissingSkills()),
                        splitLines(saved.getSuggestions()),
                        saved.getCreatedAt()))
                .toList();
    }

    private static List<String> splitComma(String csv) {
        if (csv == null || csv.isBlank()) {
            return List.of();
        }
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private static List<String> splitLines(String text) {
        if (text == null || text.isBlank()) {
            return List.of();
        }
        return Arrays.stream(text.split("\n"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private static List<String> nonNullList(List<String> list) {
        return list != null ? list : List.of();
    }
}
