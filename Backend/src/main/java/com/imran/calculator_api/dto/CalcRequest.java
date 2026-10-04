package com.imran.calculator_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CalcRequest {
    @NotNull
    private Double num1;
    @NotNull
    private Double num2;
    @NotBlank
    private String operation; // add, subtract, multiply, divide
}