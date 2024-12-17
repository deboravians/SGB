package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno cadastrarAluno(Aluno aluno){
        return alunoRepository.save(aluno);
    }

}
