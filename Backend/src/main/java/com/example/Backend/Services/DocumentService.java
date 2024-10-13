package com.example.Backend.Services;

import ch.qos.logback.core.util.StringUtil;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.Document;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.DocumentRepository;
import com.example.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final CreditRepository creditRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository, CreditRepository creditRepository) {
        this.documentRepository = documentRepository;
        this.creditRepository = creditRepository;
    }

    public Document saveDocument(MultipartFile file, String typeCredit, UUID credit_id) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Optional<Credit> creditOptional = creditRepository.findById(credit_id);

        if (creditOptional.isPresent()) {
            Credit credit = creditOptional.get();
            Document document = Document.builder()
                    .documentName(fileName)
                    .documentType(file.getContentType())
                    .data(file.getBytes())
                    .typeCreditDocument(typeCredit)
                    .credit(credit)
                    .build();

            credit.getDocuments().add(document);
            return documentRepository.save(document);
        }

        throw new RuntimeException("Credit not found with id: " + credit_id);
    }

    public Optional<Document> getFile(UUID id) throws FileNotFoundException {
        Optional<Document> file = documentRepository.findById(id);
        if(file.isPresent()){
            return file;
        }
        throw new FileNotFoundException();
    }
}