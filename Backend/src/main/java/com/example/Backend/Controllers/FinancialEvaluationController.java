package com.example.Backend.Controllers;

import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Services.FinancialEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void postFinancialEvaluation(@PathVariable String creditId, @RequestBody FinancialEvaluation financialEvaluation) {

    }

    @GetMapping("/getAll")
    public List<FinancialEvaluation> getAllFinancialEvaluation() {
        return financialEvaluationService.getAllFinancialEvaluations();
    }

}
