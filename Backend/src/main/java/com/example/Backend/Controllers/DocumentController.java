package com.example.Backend.Controllers;

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
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    private DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/post/{credit_id}")
    public ResponseEntity<UUID> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("typeCredit") String doc,
            @PathVariable("credit_id") UUID creditId // Especifica el nombre del parámetro aquí
    ) throws IOException {
        Document savedDocument = documentService.saveDocument(file, doc, creditId);
        return ResponseEntity.ok(savedDocument.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") UUID id) throws FileNotFoundException {
        Document fileEntity = documentService.getFile(id).orElseThrow(FileNotFoundException::new);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, fileEntity.getDocumentType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getDocumentName() + "\"")
                .body(fileEntity.getData());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable("id") UUID id) {
        UUID documentId = documentService.deleteDocument(id);
        if (documentId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok("Document deleted successfully:" + documentId);
    }
}