package com.skillsync.skillsync.api.dto;

import java.time.Instant;
import java.util.List;

public class MatchResponse {
    private String matchId;
    private double score;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private Instant createdAt;

    public MatchResponse(String matchId, double score, List<String> matchedSkills, List<String> missingSkills,
            Instant createdAt) {
        this.matchId = matchId;
        this.score = score;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.createdAt = createdAt;
    }

    public String getMatchId() {
        return matchId;
    }

    public double getScore() {
        return score;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
