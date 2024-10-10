package com.example.Backend.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilForm {
    private int credit_Amount;
    private double simulated_Interest_Rate;
    private int number_Of_Pays;
}
