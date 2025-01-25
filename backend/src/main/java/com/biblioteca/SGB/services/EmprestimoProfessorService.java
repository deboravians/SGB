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
                                          String isbnCopia,
                                          String cpfProfessor) {

        Professor professor = professorRepository.findById(cpfProfessor)
                .orElseThrow(() -> new IllegalStateException("copia não encontrada no banco de dados"));

        emprestimo.setProfessor(professor);

        Copia copia = copiaRepository.findById(isbnCopia)
                .orElseThrow(() -> new IllegalStateException("copia não encontrada no banco de dados"));

        try{

            if(copia.getStatus().equals("Emprestada")) {

                throw new IllegalStateException("A cópia já está emprestada!");

            }

            copia.setStatus("Emprestada"); // Tem q fazer um update na tabela copias?
            emprestimo.setCopia(copia);

        } catch (IllegalStateException e) {
            System.out.println("A cópia já está emprestada! " + e.getMessage());

        }

        return emprestimoRepository.save(emprestimo);
    }

}
