package com.biblioteca.SGB.mapper;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.models.Emprestimo;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

public class EmprestimoMapper {
    public static EmprestimoDTO toDTO(Emprestimo emprestimo, String status) {

        if (emprestimo.getAluno() != null) {
            return new EmprestimoDTO(
                    emprestimo.getAluno(),
                    emprestimo.getId(),
                    formatarData(emprestimo.getDataEmprestimo()),
                    formatarData(emprestimo.getDataPrevistaDevolucao()),
                    formatarData(emprestimo.getDataDevolucao()),
                    status,
                    emprestimo.getCopia()
            );
        } else if (emprestimo.getProfessor() != null) {
            return new EmprestimoDTO(
                    emprestimo.getProfessor(),
                    emprestimo.getId(),
                    formatarData(emprestimo.getDataEmprestimo()),
                    formatarData(emprestimo.getDataPrevistaDevolucao()),
                    formatarData(emprestimo.getDataDevolucao()),
                    status,
                    emprestimo.getCopia()
            );
        }
        return null;
    }

    public static Emprestimo toModel(EmprestimoDTO emprestimoDTO, int diasEmprestimo) {
        return new Emprestimo(
                formatarData(emprestimoDTO.getDataEmprestimo()),
                emprestimoDTO.getStatus(),
                formatarData(emprestimoDTO.getDataEmprestimo()).plusDays(diasEmprestimo)
        );
    }
}