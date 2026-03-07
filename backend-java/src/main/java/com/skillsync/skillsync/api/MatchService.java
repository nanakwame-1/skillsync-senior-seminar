package com.skillsync.skillsync.api;

import com.skillsync.skillsync.ai.AiAnalyzeService;
import com.skillsync.skillsync.ai.dto.AiAnalyzeResponse;
import com.skillsync.skillsync.api.dto.MatchRequest;
import com.skillsync.skillsync.api.dto.MatchResponse;
import com.skillsync.skillsync.model.MatchResult;
import com.skillsync.skillsync.repository.MatchResultRepository;
import org.springframework.stereotype.Service;

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

        MatchResult entity = new MatchResult();
        entity.setUserEmail(req.getUserEmail());
        entity.setResumeText(req.getResumeText());
        entity.setJobText(req.getJobText());
        entity.setScore(ai.getScore());
        entity.setMatchedSkills(String.join(",", ai.getMatchedSkills()));
        entity.setMissingSkills(String.join(",", ai.getMissingSkills()));

        MatchResult saved = matchResultRepository.save(entity);

        return new MatchResponse(
                saved.getId().toString(),
                saved.getScore(),
                ai.getMatchedSkills(),
                ai.getMissingSkills(),
                saved.getCreatedAt());
    }
}
