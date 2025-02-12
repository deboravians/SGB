package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.AlunoRepository;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmprestimoAlunoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public Emprestimo cadastrarEmprestimo(Emprestimo emprestimo,
                                          Integer idCopia,
                                          String matriculaAluno) {

        Aluno aluno = alunoRepository.findById(matriculaAluno)
                .orElseThrow(() -> new IllegalStateException("aluno não encontrado no banco de dados"));

        emprestimo.setAluno(aluno);

        Copia copia = copiaRepository.findById(idCopia)
                .orElseThrow(() -> new IllegalStateException("copia não encontrada no banco de dados"));

        if ("Emprestada".equals(copia.getStatus())) {
            throw new IllegalStateException("A cópia já está emprestada!");
        }

        copia.setStatus("Emprestada");
        copiaRepository.save(copia);

        emprestimo.setCopia(copia);

        return emprestimoRepository.save(emprestimo);
    }
}