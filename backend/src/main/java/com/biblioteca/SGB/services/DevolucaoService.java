package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DevolucaoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private CopiaRepository copiaRepository;

    public Emprestimo registrarDevolucao(int id, LocalDate data, Boolean livroExtraviado) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Empréstimo não encontrado"));

        if("Devolvido".equalsIgnoreCase(emprestimo.getStatus()) ||
                "Extraviado".equalsIgnoreCase(emprestimo.getStatus())){
            throw new IllegalStateException("este empréstimo ja foi finalizado!");
        }

        if(data.isBefore(emprestimo.getDataEmprestimo())){
            throw new IllegalArgumentException("a data de devolução não pode ser anterior a data de emprestimo!");
        }
        if (data.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("A data de devolução não pode ser futura.");
        }

        if (livroExtraviado != null && livroExtraviado) {
            emprestimo.setStatus("Extraviado");

            Copia copia = emprestimo.getCopia();
            copia.setStatus("Extraviado");
            copiaRepository.save(copia);
        }
        else {
            emprestimo.setStatus("Devolvido");

            Copia copia = emprestimo.getCopia();
            copia.setStatus("Disponível");
            copiaRepository.save(copia);
        }

        emprestimo.setDataDevolucao(data);

        return emprestimoRepository.save(emprestimo);
    }
}
