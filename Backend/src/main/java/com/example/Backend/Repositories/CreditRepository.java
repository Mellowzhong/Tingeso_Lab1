package com.example.Backend.Repositories;

import com.example.Backend.Entities.Credit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditRepository extends JpaRepository<Credit, Long> {
}
