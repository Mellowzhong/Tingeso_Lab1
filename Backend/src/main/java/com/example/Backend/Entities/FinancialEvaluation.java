package com.example.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "financialEvaluation")
public class FinancialEvaluation {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Boolean debtToIncomeRatio;

    private Boolean CreditHistory;

    private Boolean employmentHistory;

    private Boolean savingCapacity;

    private Boolean evaluationResult;

    @OneToOne
    private Credit credit;
}
