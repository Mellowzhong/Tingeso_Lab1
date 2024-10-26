package com.example.Backend.Utils;

import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.Document;

import java.util.List;
import java.util.stream.Collectors;

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
        creditDTO.setUser(credit.getUser());
        creditDTO.setCreditType(credit.getCreditType());
        creditDTO.setRequestedAmount(credit.getRequestedAmount());
        creditDTO.setApprovedAmount(credit.getApprovedAmount());
        creditDTO.setTermYears(credit.getTermYears());
        creditDTO.setStatus(credit.getStatus());
        creditDTO.setApplicationDate(credit.getApplication_Date());
        creditDTO.setApprovedRejectionDate(credit.getApprovedRejectionDate());
        creditDTO.setFinancialEvaluation(credit.getFinancialEvaluation());

        List<DocumentDTO> documentDTOS = credit.getDocuments().stream()
                .map(this::convertToDocumentDTO)
                .collect(Collectors.toList());

        creditDTO.setDocuments(documentDTOS);

        return creditDTO;
    }
}
