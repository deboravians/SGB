package com.biblioteca.SGB.strategies.emprestimo;

import com.biblioteca.SGB.models.Emprestimo;

public class StatusExtraviado implements EmprestimoStatusStrategy {

    @Override
    public boolean aplicar(Emprestimo emprestimo) {
        return "Extraviado".equals(emprestimo.getStatus());
    }

    @Override
    public String getStatus() {
        return "Extraviado";
    }
}
