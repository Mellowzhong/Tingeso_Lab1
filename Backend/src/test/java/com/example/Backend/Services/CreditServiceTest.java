package com.example.Backend.Services;

import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.User;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Utils.ToDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CreditServiceTest {

    @Mock
    private CreditRepository creditRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ToDTO toDTO; // Mock de la clase de utilidades para convertir a DTO

    @InjectMocks
    private CreditService creditService;

    private User user;
    private Credit credit1;
    private Credit credit2;

    @BeforeEach
    void setUp() {
        // Inicializar los mocks
        MockitoAnnotations.initMocks(this);

        // Crear un objeto User para usar en las pruebas
        user = new User();
        user.setId(UUID.randomUUID());

        // Crear algunos créditos de ejemplo para usar en las pruebas
        credit1 = new Credit();
        credit1.setId(UUID.randomUUID());
        credit1.setCreditType("Home Loan");
        credit1.setRequestedAmount(100000);
        credit1.setStatus("Approved");
        credit1.setUser(user);

        credit2 = new Credit();
        credit2.setId(UUID.randomUUID());
        credit2.setCreditType("Personal Loan");
        credit2.setRequestedAmount(50000);
        credit2.setStatus("Pending");
        credit2.setUser(user);

        // Configurar el servicio con el mock de ToDTO (si es necesario)
        when(toDTO.convertToCreditDTO(any(Credit.class))).thenReturn(new CreditDTO());
    }

//    addCredit tests
@Test
void addCredit_shouldSaveCreditSuccessfullyWhenUserExists() {
    UUID userId = UUID.randomUUID();
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));
    when(creditRepository.save(any(Credit.class))).thenReturn(credit1);

    UUID savedCreditId = creditService.addCredit(credit1, userId);

    assertNotNull(savedCreditId);
    assertEquals(credit1.getId(), savedCreditId);
    verify(creditRepository, times(1)).save(credit1);
}

    @Test
    void addCredit_shouldReturnNullWhenUserDoesNotExist() {
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        UUID savedCreditId = creditService.addCredit(credit1, userId);

        assertNull(savedCreditId);
        verify(creditRepository, times(0)).save(any(Credit.class));
    }

    @Test
    void addCredit_shouldSetUserInCredit() {
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        creditService.addCredit(credit1, userId);

        assertEquals(user, credit1.getUser());
    }

    @Test
    void addCredit_shouldVerifySaveCalled() {
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        creditService.addCredit(credit1, userId);

        verify(creditRepository, times(1)).save(any(Credit.class));
    }

//    getAllCreditsByUserId tests
@Test
void getAllCreditsByUserId_shouldReturnAllCreditsForUser() {
    UUID userId = UUID.randomUUID();

    // Asociar créditos al usuario
    user.setCredits(Arrays.asList(credit1, credit2));

    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    List<CreditDTO> creditsDTO = creditService.getAllCreditsByUserId(userId);

    assertEquals(2, creditsDTO.size());
}

    @Test
    void getAllCreditsByUserId_shouldReturnEmptyListWhenUserNotFound() {
        UUID userId = UUID.randomUUID();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        List<CreditDTO> creditsDTO = creditService.getAllCreditsByUserId(userId);

        assertTrue(creditsDTO.isEmpty());
    }

    @Test
    void getAllCreditsByUserId_shouldMapEachCreditToDTO() {
        UUID userId = UUID.randomUUID();

        // Asociar créditos al usuario
        user.setCredits(Arrays.asList(credit1, credit2));

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        creditService.getAllCreditsByUserId(userId);

        verify(toDTO, times(2)).convertToCreditDTO(any(Credit.class));
    }

    @Test
    void getAllCreditsByUserId_shouldVerifyFindByUserCalled() {
        UUID userId = UUID.randomUUID();

        creditService.getAllCreditsByUserId(userId);

        verify(userRepository, times(1)).findById(userId);
    }

//    getAllCredits tests
@Test
void getAllCredits_shouldReturnAllCredits() {
    List<Credit> credits = Arrays.asList(credit1, credit2);

    when(creditRepository.findAll()).thenReturn(credits);

    List<CreditDTO> creditsDTO = creditService.getAllCredits();

    assertEquals(2, creditsDTO.size());
}

    @Test
    void getAllCredits_shouldReturnEmptyListWhenNoCreditsExist() {
        when(creditRepository.findAll()).thenReturn(Collections.emptyList());

        List<CreditDTO> creditsDTO = creditService.getAllCredits();

        assertTrue(creditsDTO.isEmpty());
    }

    @Test
    void getAllCredits_shouldMapEachCreditToDTO() {
        List<Credit> credits = Arrays.asList(credit1, credit2);

        when(creditRepository.findAll()).thenReturn(credits);

        creditService.getAllCredits();

        verify(toDTO, times(2)).convertToCreditDTO(any(Credit.class));
    }

    @Test
    void getAllCredits_shouldVerifyFindAllCalled() {
        creditService.getAllCredits();

        verify(creditRepository, times(1)).findAll();
    }
}