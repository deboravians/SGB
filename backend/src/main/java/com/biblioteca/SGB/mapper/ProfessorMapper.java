package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.ProfessorDTO;
import com.biblioteca.SGB.models.Professor;

public class ProfessorMapper {

    public static ProfessorDTO toDTO(Professor professor) {
        return new ProfessorDTO(
                professor.getNome(),
                professor.getTelefone(),
                professor.getRua(),
                professor.getBairro(),
                professor.getCpf(),
                professor.getDisciplina()
        );
    }

    public static Professor toModel(ProfessorDTO professorDTO) {
        return new Professor(
                professorDTO.getNome(),
                professorDTO.getTelefone(),
                professorDTO.getRua(),
                professorDTO.getBairro(),
                professorDTO.getCpf(),
                professorDTO.getDisciplina()
        );
    }
}
