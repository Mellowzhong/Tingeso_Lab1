package com.example.Backend.Repositories;

import com.example.Backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>{
    Optional<User> findByFirstNameAndLastNameAndRut(String FirstName, String LastName, String Rut);
}