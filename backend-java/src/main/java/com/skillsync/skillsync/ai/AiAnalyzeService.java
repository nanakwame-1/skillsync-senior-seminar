package com.skillsync.skillsync.ai;

import com.skillsync.skillsync.ai.dto.AiAnalyzeRequest;
import com.skillsync.skillsync.ai.dto.AiAnalyzeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class AiAnalyzeService {

    private final WebClient aiWebClient;

    public AiAnalyzeService(
            WebClient.Builder webClientBuilder,
            @Value("${ai.base-url}") String baseUrl) {
        this.aiWebClient = webClientBuilder.baseUrl(baseUrl).build();
    }

    public AiAnalyzeResponse analyze(String resumeText, String jobText) {
        AiAnalyzeRequest payload = new AiAnalyzeRequest(resumeText, jobText);

        return aiWebClient.post()
                .uri("/analyze")
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(AiAnalyzeResponse.class)
                .timeout(Duration.ofSeconds(5))
                .onErrorResume(ex -> Mono.error(new RuntimeException("AI service unavailable: " + ex.getMessage())))
                .block();
    }
}
