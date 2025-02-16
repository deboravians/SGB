package com.biblioteca.SGB.strategies.statusEdicao;

import com.biblioteca.SGB.models.Copia;

import java.util.List;

public abstract class StatusCopiaTemplate {

    public String calcularStatus(List<Copia> copias, int totalCopias) {
        long contagemIndisponiveis = contarIndisponiveis(copias);
        return contagemIndisponiveis < totalCopias ? "Disponível" : "Indisponível";
    }

    protected abstract long contarIndisponiveis(List<Copia> copias);
}
