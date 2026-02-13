package com.skillsync.skillsync.api.dto;

import jakarta.validation.constraints.NotBlank;

public class MatchRequest {

    private String userEmail; // optional

    @NotBlank
    private String resumeText;

    @NotBlank
    private String jobText;

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
}
