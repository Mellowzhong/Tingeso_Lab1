package com.example.Backend.Services;

import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.FinancialEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FinancialEvaluationService {
    private final FinancialEvaluationRepository financialEvaluationRepository;
    private final CreditRepository creditRepository;

    @Autowired
    public FinancialEvaluationService(FinancialEvaluationRepository financialEvaluationRepository, CreditRepository creditRepository) {
        this.financialEvaluationRepository = financialEvaluationRepository;
        this.creditRepository = creditRepository;
    }

    public List<FinancialEvaluation> getAllFinancialEvaluations() {
        return financialEvaluationRepository.findAll();
    }

    public ResponseEntity<FinancialEvaluation> saveFinancialEvaluation(UUID creditID, FinancialEvaluation financialEvaluation) {
        Optional<Credit> optionalCredit = creditRepository.findById(creditID);
        if (optionalCredit.isPresent()) {
            optionalCredit.get().setFinancialEvaluation(financialEvaluation);
            return new ResponseEntity<>(financialEvaluationRepository.save(financialEvaluation), HttpStatus.OK);
        }
        return new ResponseEntity<>(financialEvaluationRepository.save(financialEvaluation), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<FinancialEvaluation> updateFinancialEvaluation(UUID creditID, UUID financialEvaluationID,FinancialEvaluation financialEvaluation) {
        Optional<Credit> optionalCredit = creditRepository.findById(creditID);
        if (optionalCredit.isPresent()) {
            Optional<FinancialEvaluation> getterFinancialEvaluation = financialEvaluationRepository.findById(financialEvaluationID);
            if (getterFinancialEvaluation.isPresent()) {
                financialEvaluation.setId(getterFinancialEvaluation.get().getId());
                financialEvaluation.setCredit(optionalCredit.get());
                return new ResponseEntity<>(financialEvaluationRepository.save(financialEvaluation), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
