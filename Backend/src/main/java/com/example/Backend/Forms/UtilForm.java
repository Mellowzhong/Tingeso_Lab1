package com.example.Backend.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilForm {
    private int CreditAmount;
    private double SimulatedInterestRate;
    private int NumberOfPays;
}
