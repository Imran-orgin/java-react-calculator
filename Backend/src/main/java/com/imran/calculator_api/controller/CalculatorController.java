package com.imran.calculator_api.controller;

import com.imran.calculator_api.dto.CalcRequest;
import com.imran.calculator_api.model.Calculation;
import com.imran.calculator_api.service.CalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CalculatorController {
    private final CalculatorService service;

    @PostMapping("/calculate")
    public Calculation calculate(@Valid @RequestBody CalcRequest req) {
        return service.calculate(req);
    }

    @GetMapping("/history")
    public List<Calculation> history() {
        return service.getHistory();
    }
}