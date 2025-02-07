package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.models.Aluno;

public class AlunoMapper {

    public static AlunoDTO toDTO(Aluno aluno) {
        return new AlunoDTO(
                aluno.getNome(),
                aluno.getTelefone(),
                aluno.getRua(),
                aluno.getBairro(),
                aluno.getMatricula(),
                aluno.getSerie(),
                aluno.getTurma(),
                aluno.getAnoLetivo()
        );
    }

    public static Aluno toModel(AlunoDTO alunoDTO) {
        return new Aluno(
                alunoDTO.getNome(),
                alunoDTO.getTelefone(),
                alunoDTO.getRua(),
                alunoDTO.getBairro(),
                alunoDTO.getMatricula(),
                alunoDTO.getSerie(),
                alunoDTO.getTurma(),
                alunoDTO.getAnoLetivo()
        );
    }
}
