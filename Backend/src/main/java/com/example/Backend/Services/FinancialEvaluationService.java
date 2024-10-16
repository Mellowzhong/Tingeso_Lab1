package com.example.Backend.Services;

import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Repositories.FinancialEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinancialEvaluationService {
    private final FinancialEvaluationRepository financialEvaluationRepository;

    @Autowired
    public FinancialEvaluationService(FinancialEvaluationRepository financialEvaluationRepository) {
        this.financialEvaluationRepository = financialEvaluationRepository;
    }

    public List<FinancialEvaluation> getAllFinancialEvaluations() {
        return financialEvaluationRepository.findAll();
    }
}
