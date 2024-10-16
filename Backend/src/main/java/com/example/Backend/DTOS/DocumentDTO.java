package com.example.Backend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {
    private UUID id;
    private String typeCreditDocument;
    private String documentName;
    private String documentType;
}