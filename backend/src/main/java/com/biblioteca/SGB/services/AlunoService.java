package com.biblioteca.SGB.services;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.repository.AlunoRepository;
import jakarta.persistence.EntityNotFoundException;
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


    public Aluno atualizarAluno(String matricula, AlunoDTO alunoDTO) {
        Aluno aluno = alunoRepository.findById(matricula)
                    .orElseThrow(() -> new EntityNotFoundException("Aluno com matrícula " + matricula + " não encontrado"));

        if(alunoDTO.getNome() != null){
            aluno.setNome(alunoDTO.getNome());
        }
        if(alunoDTO.getMatricula() != null){
            aluno.setMatricula(alunoDTO.getMatricula());
        }
        if(alunoDTO.getTelefone() != null){
            aluno.setTelefone(alunoDTO.getTelefone());
        }
        if(alunoDTO.getRua() != null){
            aluno.setRua(alunoDTO.getRua());
        }
        if(alunoDTO.getBairro() != null){
            aluno.setBairro(alunoDTO.getBairro());
        }
        if(alunoDTO.getSerie() != null){
            aluno.setSerie(alunoDTO.getSerie());
        }
        if(alunoDTO.getTurma() != null){
            aluno.setTurma(alunoDTO.getTurma());
        }
        if(alunoDTO.getAnoLetivo() != null){
            aluno.setAnoLetivo(alunoDTO.getAnoLetivo());
        }

        return alunoRepository.save(aluno);
    }
}
