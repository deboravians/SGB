package com.biblioteca.SGB.strategies.statusEmprestimo;

import com.biblioteca.SGB.models.Emprestimo;

public interface EmprestimoStatusStrategy {

    boolean aplicar(Emprestimo emprestimo);
    String getStatus();
}