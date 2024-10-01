package com.example.Backend.Repositories;

import com.example.Backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByRutAndPassword(String rut, String password);
}
