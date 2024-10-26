package com.example.Backend.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalculateCreditSimulationForm {
    private int creditAmount;
    private double simulatedInterestRate;
    private int numberOfPays;
    private int totalPriceHome;
    private String creditType;
}
