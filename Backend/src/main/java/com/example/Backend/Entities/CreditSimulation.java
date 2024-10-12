package com.example.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "creditSimulation")
public class CreditSimulation {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Integer simulatedAmount;

    private Integer simulatedTerm;

    private Integer simulatedInterestRate;

    private Integer calculatedMonthlyInstallment;

    private LocalDate simulationDate;

    @ManyToOne
    @JsonIgnore
    private User user;
}
