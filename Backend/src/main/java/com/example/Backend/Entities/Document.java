package com.example.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "document")
@Builder
public class Document {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String Type_Credit_Document;

    private String Document_Name;

    private String Document_Type;

    @Lob
    private byte[] Data;

    @ManyToOne
    @JsonIgnore
    private Credit credit;
}
