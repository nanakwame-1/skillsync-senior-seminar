package com.skillsync.skillsync.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "match_results")
public class MatchResult {

    @Id
    @GeneratedValue
    private UUID id;

    private String userEmail;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String resumeText;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String jobText;

    @Column(nullable = false)
    private double score;

    @Column(columnDefinition = "TEXT")
    private String matchedSkills;

    @Column(columnDefinition = "TEXT")
    private String missingSkills;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getResumeText() {
        return resumeText;
    }

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }

    public String getJobText() {
        return jobText;
    }

    public void setJobText(String jobText) {
        this.jobText = jobText;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(String matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
