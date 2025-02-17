package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.models.Professor;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import com.biblioteca.SGB.repository.interfaces.ProfessorRepository;
import com.biblioteca.SGB.services.interfaces.IEmprestimoProfessorService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmprestimoProfessorService implements IEmprestimoProfessorService{

    private final EmprestimoRepository emprestimoRepository;
    private final CopiaRepository copiaRepository;
    private final ProfessorRepository professorRepository;
    
    public EmprestimoProfessorService(EmprestimoRepository emprestimoRepository,
                                      CopiaRepository copiaRepository,
                                      ProfessorRepository professorRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.copiaRepository = copiaRepository;
        this.professorRepository = professorRepository;
    }

    public Emprestimo cadastrarEmprestimo(Emprestimo emprestimo,
                                          Integer idCopia,
                                          String cpfProfessor) {

        Professor professor = professorRepository.findById(cpfProfessor)
                .orElseThrow(() -> new IllegalStateException("Professor não encontrado no banco de dados"));

        emprestimo.setProfessor(professor);

        Copia copia = copiaRepository.findById(idCopia)
                .orElseThrow(() -> new IllegalStateException("Copia não encontrada no banco de dados"));

        if ("Emprestada".equals(copia.getStatus())) {
            throw new IllegalStateException("A cópia já está emprestada!");
        }

        if ("Extraviada".equals(copia.getStatus())) {
            throw new IllegalStateException("A cópia está Extraviada!");
        }

        copia.setStatus("Emprestada");
        copiaRepository.save(copia);

        emprestimo.setCopia(copia);

        return emprestimoRepository.save(emprestimo);
    }

    public List<Emprestimo> listarEmprestimosProfessores(String cpf){

        Professor professor = professorRepository.findById(cpf)
                .orElseThrow(() -> new EntityNotFoundException("Não existe um professor com esse cpf."));

        return emprestimoRepository.getEmprestimosByProfessor(professor);
    }
}