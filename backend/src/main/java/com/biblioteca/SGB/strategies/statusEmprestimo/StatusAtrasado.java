package com.biblioteca.SGB.strategies.statusEmprestimo;

import com.biblioteca.SGB.models.Emprestimo;

import java.time.LocalDate;

public class StatusAtrasado implements EmprestimoStatusStrategy {

    @Override
    public boolean aplicar(Emprestimo emprestimo) {
        return emprestimo.getDataPrevistaDevolucao().isBefore(LocalDate.now()) &&
                emprestimo.getDataDevolucao() == null;
    }

    @Override
    public String getStatus() {
        return "Atrasado";
    }
}
