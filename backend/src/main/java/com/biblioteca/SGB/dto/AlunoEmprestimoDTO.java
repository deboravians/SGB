package com.biblioteca.SGB.dto;

import java.util.List;

public class AlunoEmprestimoDTO extends AlunoDTO {
    private List<EmprestimoDTO> historicoEmprestimos;

    public AlunoEmprestimoDTO(AlunoDTO alunoDTO, List<EmprestimoDTO> historicoEmprestimos) {
        super(
                alunoDTO.getNome(),
                alunoDTO.getTelefone(),
                alunoDTO.getRua(),
                alunoDTO.getBairro(),
                alunoDTO.getMatricula(),
                alunoDTO.getSerie(),
                alunoDTO.getTurma(),
                alunoDTO.getAnoLetivo()
        );
        this.historicoEmprestimos = historicoEmprestimos;
    }

    public List<EmprestimoDTO> getHistoricoEmprestimos() {
        return historicoEmprestimos;
    }
}