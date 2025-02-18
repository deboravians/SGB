package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.interfaces.AlunoRepository;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import com.biblioteca.SGB.services.interfaces.IEmprestimoAlunoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmprestimoAlunoService implements IEmprestimoAlunoService {

    private final EmprestimoRepository emprestimoRepository;
    private final AlunoRepository alunoRepository;
    private final CopiaRepository copiaRepository;

    @Autowired
    public EmprestimoAlunoService(EmprestimoRepository emprestimoRepository,
                                  AlunoRepository alunoRepository,
                                  CopiaRepository copiaRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.alunoRepository = alunoRepository;
        this.copiaRepository = copiaRepository;
    }

    public Emprestimo cadastrarEmprestimo(Emprestimo emprestimo,
                                          Integer idCopia,
                                          String matriculaAluno) {

        Aluno aluno = alunoRepository.findById(matriculaAluno)
                .orElseThrow(() -> new IllegalStateException("Aluno não encontrado no banco de dados"));

        emprestimo.setAluno(aluno);

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

    public List<Emprestimo> listarEmprestimosAlunos(String matricula){

        Aluno aluno = alunoRepository.findById(matricula)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma aluno com essa matricula."));

        return emprestimoRepository.getEmprestimosByAluno(aluno);
    }
}