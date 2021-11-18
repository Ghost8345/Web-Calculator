package com.example.Calculator;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin
@RequestMapping("/calculate")

public class Operations {
    @GetMapping("/2evaluate")
    public BigDecimal twoOpEvaluation(@RequestParam String fOperand, @RequestParam String Operator, @RequestParam String sOperand) {
        BigDecimal result = BigDecimal.valueOf(0);
        BigDecimal fOp = new BigDecimal(fOperand);
        BigDecimal sOp = new BigDecimal(sOperand);
        switch (Operator) {
            case ("s") -> result = fOp.add(sOp);
            case ("-") -> result = fOp.subtract(sOp);
            case ("×") -> result = fOp.multiply(sOp);
            case ("÷") -> result = fOp.divide(sOp, 12, RoundingMode.DOWN);
            case ("%") -> result = fOp.remainder(sOp);
        }
       return result;
    }

    @GetMapping("/1evaluate")
    public BigDecimal oneOpEvaluation(@RequestParam String operand, @RequestParam String operator) {
        BigDecimal result = BigDecimal.valueOf(0);
        BigDecimal op = new BigDecimal(operand);
        MathContext mc = new MathContext(15);
        switch (operator) {
            case ("i") -> result = BigDecimal.valueOf(1).divide(op, 12, RoundingMode.DOWN);
            case ("sq") -> result = op.multiply(op);
            case ("sqr") -> result = op.sqrt(mc);
        }
        return result;
    }

}
