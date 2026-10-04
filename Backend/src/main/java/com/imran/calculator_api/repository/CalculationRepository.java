package com.imran.calculator_api.repository;

import com.imran.calculator_api.model.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
    List<Calculation> findTop10ByOrderByCreatedAtDesc();
}