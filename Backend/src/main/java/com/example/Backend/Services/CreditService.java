package com.example.Backend.Services;

import com.example.Backend.Entities.Credit;
import com.example.Backend.Entities.User;
import com.example.Backend.Repositories.CreditRepository;
import com.example.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public void addCredit(Credit credit, UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            credit.setUser(user);
            creditRepository.save(credit);
        }
    }

    public List<Credit> getAllCreditsByUserId(UUID user_id) {
        Optional<User> optionalUser = userRepository.findById(user_id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCredits();
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
            User user = optionalUser.get();
            creditRepository.deleteById(credit_id);
        }
    }
}
