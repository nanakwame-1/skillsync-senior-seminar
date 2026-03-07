package com.skillsync.skillsync.repository;

import com.skillsync.skillsync.model.MatchResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MatchResultRepository extends JpaRepository<MatchResult, UUID> {
}
