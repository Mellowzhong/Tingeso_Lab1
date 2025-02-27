package com.example.Backend.Utils;

import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.Document;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ToDTO {
    public DocumentDTO convertToDocumentDTO(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setId(document.getId());
        documentDTO.setTypeCreditDocument(document.getTypeCreditDocument());
        documentDTO.setDocumentName(document.getDocumentName());
        documentDTO.setDocumentType(document.getDocumentType());
        return documentDTO;
    }

    public CreditDTO convertToCreditDTO(Credit credit) {
        CreditDTO creditDTO = new CreditDTO();
        creditDTO.setId(credit.getId());
        creditDTO.setCreditType(credit.getCreditType());
        creditDTO.setRequestedAmount(credit.getRequestedAmount());
        creditDTO.setTotalPriceHome(credit.getTotalPriceHome());
        creditDTO.setMonthlyClientIncome(credit.getMonthlyClientIncome());
        creditDTO.setStatus(credit.getStatus());
        creditDTO.setApplicationDate(credit.getApplicationDate());
        creditDTO.setFinancialEvaluation(credit.getFinancialEvaluation());
        creditDTO.setUser(credit.getUser());

        List<DocumentDTO> documentDTOS = credit.getDocuments().stream()
                .map(this::convertToDocumentDTO)
                .collect(Collectors.toList());

        creditDTO.setDocuments(documentDTOS);

        return creditDTO;
    }
}
