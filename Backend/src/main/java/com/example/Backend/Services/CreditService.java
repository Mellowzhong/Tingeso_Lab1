package com.example.Backend.Services;

import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.User;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Utils.ToDTO;
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
    private final ToDTO toDTO; // Instancia de la clase de utilidades

    @Autowired
    public CreditService(CreditRepository creditRepository, UserRepository userRepository) {
        this.creditRepository = creditRepository;
        this.userRepository = userRepository;
        this.toDTO = new ToDTO(); // Inicializar la instancia
    }

    // CRUD

    public UUID addCredit(Credit credit, UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            credit.setUser(user);
            creditRepository.save(credit);
            return credit.getId();
        }
        return null;
    }

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
            creditRepository.deleteById(credit_id);
        }
    }

    public List<CreditDTO> getAllCreditsByUserId(UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCredits().stream()
                    .map(toDTO::convertToCreditDTO)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<CreditDTO> getAllCredits() {
        List<Credit> credits = creditRepository.findAll();
        return credits.stream()
                .map(toDTO::convertToCreditDTO)
                .collect(Collectors.toList());
    }
}