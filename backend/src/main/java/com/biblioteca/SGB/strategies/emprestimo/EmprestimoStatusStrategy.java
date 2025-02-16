package com.biblioteca.SGB.strategies.emprestimo;

import com.biblioteca.SGB.models.Emprestimo;

public interface EmprestimoStatusStrategy {
    boolean aplicar(Emprestimo emprestimo);
    String getStatus();
}
