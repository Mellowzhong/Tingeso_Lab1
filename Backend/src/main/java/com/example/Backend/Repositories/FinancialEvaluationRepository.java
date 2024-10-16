package com.example.Backend.Repositories;

import com.example.Backend.Entities.FinancialEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FinancialEvaluationRepository extends JpaRepository<FinancialEvaluation, UUID> {
}
