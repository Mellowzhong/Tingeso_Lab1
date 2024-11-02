package com.example.Backend.Services;

import com.example.Backend.DTOS.DocumentDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.Document;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.DocumentRepository;
import com.example.Backend.Utils.ToDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private CreditRepository creditRepository;

    @Mock
    private ToDTO toDTO;

    @InjectMocks
    private DocumentService documentService;

    private Document document1;
    private Document document2;
    private Credit credit;

    @BeforeEach
    void setUp() {
        // Inicializar los mocks
        MockitoAnnotations.initMocks(this);

        // Crear un objeto Credit para usar en las pruebas
        credit = new Credit();
        credit.setId(UUID.randomUUID());

        // Crear algunos documentos de ejemplo para usar en las pruebas
        document1 = new Document();
        document1.setId(UUID.randomUUID());
        document1.setDocumentName("document1.pdf");
        document1.setDocumentType("application/pdf");
        document1.setData("dummy data 1".getBytes());
        document1.setTypeCreditDocument("Credit Type 1");
        document1.setCredit(credit);

        document2 = new Document();
        document2.setId(UUID.randomUUID());
        document2.setDocumentName("document2.pdf");
        document2.setDocumentType("application/pdf");
        document2.setData("dummy data 2".getBytes());
        document2.setTypeCreditDocument("Credit Type 2");
        document2.setCredit(credit);

        when(toDTO.convertToDocumentDTO(any(Document.class))).thenReturn(new DocumentDTO());
    }

//    saveDocument tests
@Test
void saveDocument_shouldSaveDocumentSuccessfully() throws IOException {
    UUID creditID = UUID.randomUUID();
    MultipartFile file = new MockMultipartFile("file", "document1.pdf", "application/pdf", "dummy data".getBytes());

    when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));
    when(documentRepository.save(any(Document.class))).thenReturn(document1);

    Document savedDocument = documentService.saveDocument(file, "Credit Type 1", creditID);

    assertNotNull(savedDocument);
    assertEquals("document1.pdf", savedDocument.getDocumentName());
    assertEquals("application/pdf", savedDocument.getDocumentType());
}

    @Test
    void saveDocument_shouldThrowExceptionWhenCreditNotFound() throws IOException {
        UUID creditID = UUID.randomUUID();
        MultipartFile file = new MockMultipartFile("file", "document1.pdf", "application/pdf", "dummy data".getBytes());

        when(creditRepository.findById(creditID)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            documentService.saveDocument(file, "Credit Type 1", creditID);
        });

        assertEquals("Credit not found with id: " + creditID, exception.getMessage());
    }

    @Test
    void saveDocument_shouldSetCreditInSavedDocument() throws IOException {
        UUID creditID = UUID.randomUUID();
        MultipartFile file = new MockMultipartFile("file", "document1.pdf", "application/pdf", "dummy data".getBytes());

        when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));
        when(documentRepository.save(any(Document.class))).thenReturn(document1);

        Document savedDocument = documentService.saveDocument(file, "Credit Type 1", creditID);

        assertEquals(credit, savedDocument.getCredit());
    }

    @Test
    void saveDocument_shouldVerifySaveCalled() throws IOException {
        UUID creditID = UUID.randomUUID();
        MultipartFile file = new MockMultipartFile("file", "document1.pdf", "application/pdf", "dummy data".getBytes());

        when(creditRepository.findById(creditID)).thenReturn(Optional.of(credit));

        documentService.saveDocument(file, "Credit Type 1", creditID);

        verify(documentRepository, times(1)).save(any(Document.class));
    }

//    getFile tests
    @Test
    void getFile_shouldReturnFileWhenExists() throws FileNotFoundException {
        UUID documentID = UUID.randomUUID();

        when(documentRepository.findById(documentID)).thenReturn(Optional.of(document1));

        Optional<Document> retrievedFile = documentService.getFile(documentID);

        assertTrue(retrievedFile.isPresent());
        assertEquals(document1.getId(), retrievedFile.get().getId());
    }

    @Test
    void getFile_shouldThrowExceptionWhenFileNotFound() {
        UUID documentID = UUID.randomUUID();

        when(documentRepository.findById(documentID)).thenReturn(Optional.empty());

        assertThrows(FileNotFoundException.class, () -> {
            documentService.getFile(documentID);
        });
    }

    @Test
    void getFile_shouldVerifyFindByIdCalled() throws FileNotFoundException {
        UUID documentID = UUID.randomUUID();

        when(documentRepository.findById(documentID)).thenReturn(Optional.of(document1));

        documentService.getFile(documentID);

        verify(documentRepository, times(1)).findById(documentID);
    }

    @Test
    void getFile_shouldReturnCorrectData() throws FileNotFoundException {
        UUID documentID = UUID.randomUUID();

        when(documentRepository.findById(documentID)).thenReturn(Optional.of(document1));

        Optional<Document> retrievedFile = documentService.getFile(documentID);

        assertArrayEquals("dummy data 1".getBytes(), retrievedFile.get().getData());
    }

//    getAllDocuments tests
@Test
void getAllDocuments_shouldReturnAllDocumentsAsDTOs() {
    List<Document> documents = Arrays.asList(document1, document2);

    when(documentRepository.findAll()).thenReturn(documents);

    List<DocumentDTO> dtoList = documentService.getAllDocuments();

    assertEquals(2, dtoList.size());
}

    @Test
    void getAllDocuments_shouldReturnEmptyListWhenNoDocuments() {
        when(documentRepository.findAll()).thenReturn(Collections.emptyList());

        List<DocumentDTO> dtoList = documentService.getAllDocuments();

        assertTrue(dtoList.isEmpty());
    }

    @Test
    void getAllDocuments_shouldMapEachDocumentToDTO() {
        List<Document> documents = Arrays.asList(document1, document2);

        when(documentRepository.findAll()).thenReturn(documents);

        List<DocumentDTO> dtoList = documentService.getAllDocuments();

        verify(toDTO, times(documents.size())).convertToDocumentDTO(any(Document.class));
    }

    @Test
    void getAllDocuments_shouldVerifyFindAllCalled() {
        documentService.getAllDocuments();

        verify(documentRepository, times(1)).findAll();
    }
}