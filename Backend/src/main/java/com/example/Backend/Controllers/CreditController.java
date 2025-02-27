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
@CrossOrigin("*")
public class CreditController {
    private final CreditService creditService;

    @Autowired
    public CreditController(CreditService creditService) {
        this.creditService = creditService;
    }

    @PostMapping("/add/{user_id}")
    public UUID addCredit(@RequestBody Credit credit, @PathVariable("user_id") UUID user_id) {
        return creditService.addCredit(credit, user_id);
    }

    @GetMapping("/get/{user_id}")
    public List<CreditDTO> getCreditByUserId(@PathVariable("user_id") UUID user_id) {
        return creditService.getAllCreditsByUserId(user_id);
    }

    @GetMapping("/getAll")
    public List<CreditDTO> getAllCredits() {
        return creditService.getAllCredits();
    }
}
