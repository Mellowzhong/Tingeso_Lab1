package com.example.Backend.Utils;

import com.example.Backend.Forms.UtilForm;
import com.example.Backend.Response.SimulationResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/calculate")
public class CalculateSimulation {

    @PostMapping
    private SimulationResponse calculate(@RequestBody UtilForm utilForm) {

        double amount = utilForm.getCreditAmount();
        double term = utilForm.getSimulatedInterestRate();
        double totalPriceHome = utilForm.getTotalPriceHome();
        String creditType = utilForm.getCreditType();

        if (creditType.equals("firstHome")) {
            totalPriceHome = totalPriceHome * 0.8;
        }else if (creditType.equals("secondHome")) {
            totalPriceHome = totalPriceHome * 0.7;
        }else if (creditType.equals("commercialProperty")) {
            totalPriceHome = totalPriceHome * 0.6;
        }else if (creditType.equals("remodeling")) {
            totalPriceHome = totalPriceHome * 0.5;
        }

        int pay = utilForm.getNumberOfPays();

        double factor = Math.pow(1 + term, pay);
        double quote = (amount * term * factor) / (factor - 1);

        if (quote < totalPriceHome) {
            return SimulationResponse.builder()
                    .quote((int) Math.round(quote * 1000))
                    .message("Esta dentro del rango")
                    .build();
        }else{
            return SimulationResponse.builder()
                    .quote((int) Math.round(quote * 1000))
                    .message("No esta dentro del rango")
                    .build();
        }
    }
}