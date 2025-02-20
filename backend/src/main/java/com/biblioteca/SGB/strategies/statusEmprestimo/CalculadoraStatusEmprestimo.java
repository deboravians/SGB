package com.biblioteca.SGB.strategies.statusEmprestimo;

import com.biblioteca.SGB.models.Emprestimo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CalculadoraStatusEmprestimo {

    private final List<EmprestimoStatusStrategy> estrategias;

    public CalculadoraStatusEmprestimo() {
        this.estrategias = List.of(
                new StatusExtraviado(),
                new StatusDevolvido(),
                new StatusAtrasado(),
                new StatusEmAndamento()
        );
    }

    public String calcularStatus(Emprestimo emprestimo) {
        for (EmprestimoStatusStrategy estrategia : estrategias) {
            if (estrategia.aplicar(emprestimo)) {
                return estrategia.getStatus();
            }
        }
        return "Status Desconhecido";
    }
}