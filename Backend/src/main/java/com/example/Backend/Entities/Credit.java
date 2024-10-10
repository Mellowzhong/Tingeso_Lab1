package com.example.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String Credit_Type;

    private Integer Requested_Amount;

    private Integer Approved_Amount;

    private Integer Term_Years;

    private String Status;

    private Date Application_Date;

    private Date Approved_rejection_Date;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "credit", cascade = CascadeType.ALL)
    private List<Document> Documents;
}