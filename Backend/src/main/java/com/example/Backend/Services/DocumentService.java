package com.example.Backend.Services;

import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.Document;
import com.example.Backend.Utils.ToDTO;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.DocumentRepository;
import jakarta.transaction.Transactional;
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
import java.util.stream.Collectors;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final CreditRepository creditRepository;
    private final ToDTO toDTO; // Inyectar la clase de utilidades

    @Autowired
    public DocumentService(DocumentRepository documentRepository, CreditRepository creditRepository, ToDTO toDTO) {
        this.documentRepository = documentRepository;
        this.creditRepository = creditRepository;
        this.toDTO = toDTO; // Inyectar la instancia de ToDTO
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

    @Transactional
    public Optional<Document> getFile(UUID id) throws FileNotFoundException {
        Optional<Document> file = documentRepository.findById(id);
        if (file.isPresent()) {
            return file;
        }
        throw new FileNotFoundException();
    }

    // Método para obtener todos los documentos como DTOs
    public List<DocumentDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return documents.stream()
                .map(toDTO::convertToDocumentDTO) // Utilizar el método del servicio inyectado
                .collect(Collectors.toList());
    }

    public UUID deleteDocument(UUID id) {
        Optional<Document> document = documentRepository.findById(id);
        if (document.isPresent()) {
            documentRepository.delete(document.get());
            return document.get().getId();
        }
        return null;
    }
}