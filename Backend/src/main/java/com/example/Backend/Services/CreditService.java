package com.example.Backend.Services;

import com.example.Backend.Entities.Document;
import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.User;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Response.CreditDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CreditService {
    private final CreditRepository creditRepository;
    private final UserRepository userRepository;

    @Autowired
    public CreditService(CreditRepository creditRepository, UserRepository userRepository) {
        this.creditRepository = creditRepository;
        this.userRepository = userRepository;
    }

//    CRUD

    public CreditDataResponse addCredit(Credit credit, UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            credit.setUser(user);
            creditRepository.save(credit);

            CreditDataResponse creditDataResponse = CreditDataResponse.builder()
                    .creditId(credit.getId())
                    .build();
            return creditDataResponse;
        }
        return null;
    }

//    public List<Credit> getAllCreditsByUserId(UUID user_id) {
//        Optional<User> optionalUser = userRepository.findById(user_id);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            return user.getCredits();
//        }
//        return null;
//    }

    public void updateCredit(Credit credit, UUID user_id, UUID credit_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            credit.setUser(user);
            credit.setId(credit_id);
            creditRepository.save(credit);
        }
    }

    public void deleteCredit(UUID user_id, UUID credit_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            creditRepository.deleteById(credit_id);
        }
    }

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
        creditDTO.setApprovedAmount(credit.getApprovedAmount());
        creditDTO.setTermYears(credit.getTermYears());
        creditDTO.setStatus(credit.getStatus());
        creditDTO.setApplicationDate(credit.getApplication_Date());
        creditDTO.setUser(credit.getUser());
        creditDTO.setApprovedRejectionDate(credit.getApprovedRejectionDate());

        List<DocumentDTO> documentDTOS = credit.getDocuments().stream()
                .map(this::convertToDocumentDTO)
                .collect(Collectors.toList());

        creditDTO.setDocuments(documentDTOS);

        return creditDTO;
    }

    public List<CreditDTO> getAllCreditsByUserId(UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCredits().stream()
                    .map(this::convertToCreditDTO)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<CreditDTO> getAllCredits() {
        List<Credit> credits = creditRepository.findAll();
        return credits.stream().map(this::convertToCreditDTO).collect(Collectors.toList());
    }
}
