package com.imran.calculator_api.service;

import com.imran.calculator_api.dto.CalcRequest;
import com.imran.calculator_api.model.Calculation;
import com.imran.calculator_api.repository.CalculationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalculatorService {
    private final CalculationRepository repository;

    public Calculation calculate(CalcRequest req) {
        double a = req.getNum1(), b = req.getNum2();
        double result = switch (req.getOperation()) {
            case "add" -> a + b;
            case "subtract" -> a - b;
            case "multiply" -> a * b;
            case "divide" -> {
                if (b == 0) throw new IllegalArgumentException("Cannot divide by zero");
                yield a / b;
            }
            default -> throw new IllegalArgumentException("Invalid operation");
        };
        Calculation calc = new Calculation();
        calc.setNum1(a);
        calc.setNum2(b);
        calc.setOperation(req.getOperation());
        calc.setResult(result);
        return repository.save(calc);
    }

    public List<Calculation> getHistory() {
        return repository.findTop10ByOrderByCreatedAtDesc();
    }
}