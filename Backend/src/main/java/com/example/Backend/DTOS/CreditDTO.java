package com.example.Backend.DTOS;

import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.FinancialEvaluation;
import com.example.Backend.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditDTO {
    private UUID id;
    private String creditType;
    private Integer requestedAmount;
    private Integer totalPriceHome;
    private Integer monthlyClientIncome;
    private String status;
    private Date applicationDate;
    private User user;
    private List<DocumentDTO> documents;
    private FinancialEvaluation financialEvaluation;
}