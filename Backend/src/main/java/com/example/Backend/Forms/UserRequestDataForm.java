package com.example.Backend.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDataForm {
    private String firstName;

    private String lastName;

    private String rut;
}
