package com.example.Backend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDataResponse {
    private UUID id;

    private String firstName;

    private String lastName;

    private Integer age;
}
