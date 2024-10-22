package com.example.Backend.Controllers;

import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Services.FinancialEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/financialEvaluation")
public class FinancialEvaluationController {
    private final FinancialEvaluationService financialEvaluationService;

    @Autowired
    public FinancialEvaluationController(FinancialEvaluationService financialEvaluationService) {
        this.financialEvaluationService = financialEvaluationService;
    }

//    CRUD

    @PostMapping("/post/{creditId}")
    public ResponseEntity<FinancialEvaluation> postFinancialEvaluation(@PathVariable UUID creditId, @RequestBody FinancialEvaluation financialEvaluation) {
        return financialEvaluationService.saveFinancialEvaluation(creditId, financialEvaluation);
    }

    @GetMapping("/getAll")
    public List<FinancialEvaluation> getAllFinancialEvaluation() {
        return financialEvaluationService.getAllFinancialEvaluations();
    }


    @PutMapping("/update/{creditId}/{financialEvaluationId}")
    public ResponseEntity<FinancialEvaluation> updateFinancialEvaluation(@PathVariable UUID creditId, @PathVariable UUID financialEvaluationId,@RequestBody FinancialEvaluation financialEvaluation) {
        return financialEvaluationService.updateFinancialEvaluation(creditId, financialEvaluationId, financialEvaluation);
    }
}
