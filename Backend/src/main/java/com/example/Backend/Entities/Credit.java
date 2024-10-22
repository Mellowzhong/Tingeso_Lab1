package com.example.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "credit")
public class Credit {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String creditType;

    private Integer requestedAmount;

    private Integer approvedAmount;

    private Integer termYears;

    private String status;

    private Date application_Date;

    private Date approvedRejectionDate;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "credit", cascade = CascadeType.ALL)
    private List<Document> documents = new ArrayList<>();

    @OneToOne
    private FinancialEvaluation financialEvaluation;
}
