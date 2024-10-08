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

    private Integer Simulated_Amount;

    private Integer Simulated_Term;

    private Integer Simulated_Interest_Rate;

    private Integer Calculated_Monthly_Installment;

    private LocalDate Simulation_Date;

    @ManyToOne
    @JsonIgnore
    private User user;
}
