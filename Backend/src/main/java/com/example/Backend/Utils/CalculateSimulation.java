package com.example.Backend.Utils;

import com.example.Backend.Forms.UtilForm;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/calculate")
public class CalculateSimulation {

    @PostMapping
    private double calculate(@RequestBody UtilForm utilForm) {

        System.out.println(utilForm.toString());
        double amount = utilForm.getCredit_Amount();
        double term = utilForm.getSimulated_Interest_Rate();
        int pay = utilForm.getNumber_Of_Pays();

        double factor = Math.pow(1 + term, pay);
        double quote = (amount * term * factor) / (factor - 1);

        return (int) Math.round(quote);
    }
}