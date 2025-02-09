package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.repository.AlunoRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public Aluno cadastrarAluno(Aluno aluno){

        if (alunoRepository.findById(aluno.getMatricula()).isPresent()) {
            throw new IllegalArgumentException("Já existe um aluno cadastrado com essa matrícula.");
        }
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarAlunos(){ return alunoRepository.findAll(); }

    public void excluirAluno(String matricula){

        if (emprestimoRepository.existsByAlunoMatricula(matricula)){
            throw new IllegalArgumentException("O aluno possui empréstimos e não pode ser excluído.");
        }

        if(!alunoRepository.existsById(matricula)){
            throw new IllegalStateException("Aluno com matricula " + matricula + " não encontrado.");
        }
        alunoRepository.deleteById(matricula);
    }

    public Aluno atualizarAluno(String matricula, Aluno alunoAtualizado) {

        Aluno aluno = alunoRepository.findById(matricula)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma aluno com essa matricula."));

        if(!aluno.getMatricula().equals(alunoAtualizado.getMatricula())) {
            throw new IllegalArgumentException("a matricula não pode ser alterada");
        }

        return alunoRepository.save(alunoAtualizado);
    }
}