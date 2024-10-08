package com.example.Backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`user`")
public class User {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String First_Name;

    private String Last_Name;

    private String Rut;

    private String Address;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Credit> credits;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CreditSimulation> creditSimulations;
}
