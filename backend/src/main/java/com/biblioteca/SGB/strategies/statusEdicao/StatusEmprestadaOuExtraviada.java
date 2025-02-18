package com.biblioteca.SGB.strategies.statusEdicao;

import com.biblioteca.SGB.models.Copia;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatusEmprestadaOuExtraviada extends StatusCopiaTemplate {

    @Override
    protected long contarIndisponiveis(List<Copia> copias) {
        return copias.stream()
                .filter(copia -> copia.getStatus().equalsIgnoreCase("Emprestada")
                                    || copia.getStatus().equalsIgnoreCase("Extraviada"))
                .count();
    }
}
