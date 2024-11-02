package com.example.Backend.Services;

import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Repositories.FinancialEvaluationRepository;
import com.example.Backend.Repositories.CreditRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FinancialEvaluationServiceTest {

    @Mock
    private FinancialEvaluationRepository financialEvaluationRepository;

    @Mock
    private CreditRepository creditRepository;

    @InjectMocks
    private FinancialEvaluationService financialEvaluationService;

    FinancialEvaluation financialEvaluation1;
    FinancialEvaluation financialEvaluation2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        financialEvaluation1 = new FinancialEvaluation();
        financialEvaluation1.setId(UUID.randomUUID());
        financialEvaluation1.setFeeToIncomeRatio(true);
        financialEvaluation1.setCreditHistory(true);
        financialEvaluation1.setEmploymentHistory(true);
        financialEvaluation1.setDebtToIncomeRatio(true);
        financialEvaluation1.setFinanceMaxAmount(true);
        financialEvaluation1.setApplicantAge(true);
        financialEvaluation1.setSavingCapacity(true);
        financialEvaluation1.setEvaluationResult(true);

        financialEvaluation2 = new FinancialEvaluation();
        financialEvaluation2.setId(UUID.randomUUID());
        financialEvaluation2.setFeeToIncomeRatio(false);
        financialEvaluation2.setCreditHistory(false);
        financialEvaluation2.setEmploymentHistory(false);
        financialEvaluation2.setDebtToIncomeRatio(false);
        financialEvaluation2.setFinanceMaxAmount(false);
        financialEvaluation2.setApplicantAge(false);
        financialEvaluation2.setSavingCapacity(false);
        financialEvaluation2.setEvaluationResult(false);
    }

//    getAllFinancialEvaluations tests
@Test
void getAllFinancialEvaluations_shouldReturnAllEvaluations() {
    when(financialEvaluationRepository.findAll()).thenReturn(Arrays.asList(financialEvaluation1, financialEvaluation2));
    List<FinancialEvaluation> evaluations = financialEvaluationService.getAllFinancialEvaluations();

    assertEquals(2, evaluations.size());
    assertTrue(evaluations.contains(financialEvaluation1));
    assertTrue(evaluations.contains(financialEvaluation2));
}

    @Test
    void getAllFinancialEvaluations_shouldReturnEmptyListIfNoEvaluations() {
        when(financialEvaluationRepository.findAll()).thenReturn(new ArrayList<>());
        List<FinancialEvaluation> evaluations = financialEvaluationService.getAllFinancialEvaluations();

        assertTrue(evaluations.isEmpty());
    }

    @Test
    void getAllFinancialEvaluations_shouldNotReturnNull() {
        when(financialEvaluationRepository.findAll()).thenReturn(Arrays.asList(financialEvaluation1, financialEvaluation2));
        List<FinancialEvaluation> evaluations = financialEvaluationService.getAllFinancialEvaluations();

        assertNotNull(evaluations);
    }

    @Test
    void getAllFinancialEvaluations_shouldVerifyFindAllCalled() {
        financialEvaluationService.getAllFinancialEvaluations();
        verify(financialEvaluationRepository, times(1)).findAll();
    }

//    saveFinancialEvaluation tests
@Test
void saveFinancialEvaluation_shouldSaveSuccessfullyWithValidCredit() {
    UUID creditID = UUID.randomUUID();
    when(creditRepository.findById(creditID)).thenReturn(Optional.of(new Credit()));
    when(financialEvaluationRepository.save(financialEvaluation1)).thenReturn(financialEvaluation1);

    ResponseEntity<FinancialEvaluation> response = financialEvaluationService.saveFinancialEvaluation(creditID, financialEvaluation1);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(financialEvaluation1, response.getBody());
}

    @Test
    void saveFinancialEvaluation_shouldReturnBadRequestWhenCreditNotFound() {
        UUID creditID = UUID.randomUUID();
        when(creditRepository.findById(creditID)).thenReturn(Optional.empty());

        ResponseEntity<FinancialEvaluation> response = financialEvaluationService.saveFinancialEvaluation(creditID, financialEvaluation1);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void saveFinancialEvaluation_shouldSetCreditInFinancialEvaluation() {
        UUID creditID = UUID.randomUUID();
        Credit credit = new Credit();
        when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));
        when(financialEvaluationRepository.save(financialEvaluation1)).thenReturn(financialEvaluation1);

        ResponseEntity<FinancialEvaluation> response = financialEvaluationService.saveFinancialEvaluation(creditID, financialEvaluation1);

        assertEquals(financialEvaluation1.getCredit(), credit);
    }

    @Test
    void saveFinancialEvaluation_shouldVerifySaveCalled() {
        UUID creditID = UUID.randomUUID();
        when(creditRepository.findById(creditID)).thenReturn(Optional.of(new Credit()));

        financialEvaluationService.saveFinancialEvaluation(creditID, financialEvaluation1);

        verify(financialEvaluationRepository, times(1)).save(financialEvaluation1);
    }

//    updateFinancialEvaluation tests
@Test
void updateFinancialEvaluation_shouldReturnUpdatedEvaluationWhenExists() {
    UUID creditID = UUID.randomUUID();
    UUID financialEvaluationID = UUID.randomUUID();

    Credit credit = new Credit();
    when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));
    when(financialEvaluationRepository.findById(financialEvaluationID)).thenReturn(Optional.of(financialEvaluation1));
    when(financialEvaluationRepository.save(financialEvaluation1)).thenReturn(financialEvaluation1);

    ResponseEntity<FinancialEvaluation> response = financialEvaluationService.updateFinancialEvaluation(creditID, financialEvaluationID, financialEvaluation1);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(financialEvaluation1, response.getBody());
    assertEquals(credit, financialEvaluation1.getCredit());
}

    @Test
    void updateFinancialEvaluation_shouldReturnBadRequestWhenCreditNotFound() {
        UUID creditID = UUID.randomUUID();
        UUID financialEvaluationID = UUID.randomUUID();

        when(creditRepository.findById(creditID)).thenReturn(Optional.empty());

        ResponseEntity<FinancialEvaluation> response = financialEvaluationService.updateFinancialEvaluation(creditID, financialEvaluationID, financialEvaluation1);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void updateFinancialEvaluation_shouldReturnBadRequestWhenFinancialEvalNotFound() {
        UUID creditID = UUID.randomUUID();
        UUID financialEvalID = UUID.randomUUID();

        when(creditRepository.findById(creditID)).thenReturn(Optional.of(new Credit()));
        when(financialEvaluationRepository.findById(financialEvalID)).thenReturn(Optional.empty());

        ResponseEntity<FinancialEvaluation> response = financialEvaluationService.updateFinancialEvaluation(creditID, financialEvalID, financialEvaluation1);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void updateFinancialEvaluation_shouldVerifySaveCalledWithCorrectData() {
        UUID creditID = UUID.randomUUID();
        UUID financialEvalID = UUID.randomUUID();

        Credit credit = new Credit();

        when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));
        when(financialEvaluationRepository.findById(financialEvalID)).thenReturn(Optional.of(financialEvaluation1));

        financialEvaluationService.updateFinancialEvaluation(creditID, financialEvalID, financialEvaluation1);

        verify(financialEvaluationRepository, times(1)).save(financialEvaluation1);
    }
}