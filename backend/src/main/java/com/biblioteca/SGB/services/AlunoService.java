package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno cadastrarAluno(Aluno aluno){
        if (alunoRepository.findById(aluno.getMatricula()).isPresent()) {
            throw new IllegalArgumentException("Já existe um aluno cadastrado com essa matrícula.");
        }
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarAlunos(){ return alunoRepository.findAll(); }

    public void excluirAluno(String matricula){
        if(!alunoRepository.existsById(matricula)){
            throw new IllegalStateException("Aluno com matricula " + matricula + " não encontrado.");
        }
        alunoRepository.deleteById(matricula);
    }


}
