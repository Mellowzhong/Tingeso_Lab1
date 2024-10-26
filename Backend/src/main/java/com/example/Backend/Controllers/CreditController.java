package com.example.Backend.Controllers;

import com.example.Backend.DTOS.CreditDTO;
import com.example.Backend.Entities.Credit;
import com.example.Backend.Services.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/credit")
public class CreditController {
    private final CreditService creditService;

    @Autowired
    public CreditController(CreditService creditService) {
        this.creditService = creditService;
    }

//    CRUD
    @PostMapping("/add/{user_id}")
    public UUID addCredit(@RequestBody Credit credit, @PathVariable UUID user_id) {
        System.out.println(credit.toString());
        return creditService.addCredit(credit, user_id);
    }

    @GetMapping("/get/{user_id}")
    public List<CreditDTO> getCreditByUserId(@PathVariable UUID user_id) {
        return creditService.getAllCreditsByUserId(user_id);
    }

    @GetMapping("/getAll")
    public List<CreditDTO> getAllCredits() {
        return creditService.getAllCredits();
    }

    @PutMapping("/update/{user_id}/{credit_id}")
    public void updateCredit(@RequestBody Credit credit, @PathVariable UUID user_id, @PathVariable UUID credit_id) {
        creditService.updateCredit(credit, user_id, credit_id);
    }

    @DeleteMapping("/delete/{user_id}/{credit_id}")
    public void deleteCredit(@PathVariable UUID user_id, @PathVariable UUID credit_id) {
        creditService.deleteCredit(credit_id, user_id);
    }
}
