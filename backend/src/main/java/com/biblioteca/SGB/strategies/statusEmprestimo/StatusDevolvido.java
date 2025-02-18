package com.biblioteca.SGB.strategies.statusEmprestimo;

import com.biblioteca.SGB.models.Emprestimo;

public class StatusDevolvido implements EmprestimoStatusStrategy {

    @Override
    public boolean aplicar(Emprestimo emprestimo) {
        return "Devolvido".equals(emprestimo.getStatus());
    }

    @Override
    public String getStatus() {
        return "Devolvido";
    }
}