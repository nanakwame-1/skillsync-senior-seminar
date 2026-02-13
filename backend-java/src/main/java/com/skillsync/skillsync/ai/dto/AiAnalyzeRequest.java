package com.skillsync.skillsync.ai.dto;

public class AiAnalyzeRequest {
    private String resumeText;
    private String jobText;

    public AiAnalyzeRequest() {
    }

    public AiAnalyzeRequest(String resumeText, String jobText) {
        this.resumeText = resumeText;
        this.jobText = jobText;
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
