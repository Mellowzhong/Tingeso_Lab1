package com.example.Backend.Services;

import ch.qos.logback.core.util.StringUtil;
import com.example.Backend.Entities.Document;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.DocumentRepository;
import com.example.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document saveDocument(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Document document = Document.builder()
                .Document_Name(fileName)
                .Document_Type(file.getContentType())
                .Data(file.getBytes())
                .build();

        return documentRepository.save(document);
    }

    public Optional<Document> getFile(UUID id) throws FileNotFoundException {
        Optional<Document> file = documentRepository.findById(id);
        if(file.isPresent()){
            return file;
        }
        throw new FileNotFoundException();
    }
}