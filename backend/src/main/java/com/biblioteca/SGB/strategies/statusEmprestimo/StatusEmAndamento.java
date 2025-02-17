package com.biblioteca.SGB.strategies.statusEmprestimo;

import com.biblioteca.SGB.models.Emprestimo;

public class StatusEmAndamento implements EmprestimoStatusStrategy {

    @Override
    public boolean aplicar(Emprestimo emprestimo) {
        return true;
    }

    @Override
    public String getStatus() {
        return "Em Andamento";
    }
}