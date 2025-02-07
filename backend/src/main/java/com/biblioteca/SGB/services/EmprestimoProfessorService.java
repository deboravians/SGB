package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import com.biblioteca.SGB.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmprestimoProfessorService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    public Emprestimo cadastrarEmprestimo(Emprestimo emprestimo,
                                          Integer idCopia,
                                          String cpfProfessor) {

        Professor professor = professorRepository.findById(cpfProfessor)
                .orElseThrow(() -> new IllegalStateException("professor não encontrado no banco de dados"));

        emprestimo.setProfessor(professor);

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
