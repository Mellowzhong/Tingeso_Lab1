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

    private String typeCreditDocument;

    private String documentName;

    private String documentType;

    @Lob
    @Basic(fetch = FetchType.EAGER)
    @JsonIgnore
    private byte[] data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Credit credit;
}
