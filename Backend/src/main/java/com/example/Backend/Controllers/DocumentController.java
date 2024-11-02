package com.example.Backend.Controllers;

import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Document;
import com.example.Backend.Services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    private DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/post/{credit_id}")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("typeCredit") String doc,
            @PathVariable UUID credit_id
    ) throws IOException {
        Document savedDocument = documentService.saveDocument(file, doc, credit_id);
        return ResponseEntity.ok("Document uploaded successfully. ID: " + savedDocument.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable UUID id) throws FileNotFoundException {
        Document fileEntity = documentService.getFile(id).orElseThrow(FileNotFoundException::new);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, fileEntity.getDocumentType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getDocumentName()+"\"")
                .body(fileEntity.getData());
    }

    // Nuevo método para obtener todos los documentos como DTOs
    @GetMapping("/all")
    public ResponseEntity<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }
}