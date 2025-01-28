package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping()
    public AlunoDTO cadastrarAluno(@RequestBody AlunoDTO alunoDTO) {

        Aluno aluno = new Aluno(
                alunoDTO.getNome(),
                alunoDTO.getTelefone(),
                alunoDTO.getRua(),
                alunoDTO.getBairro(),
                alunoDTO.getMatricula(),
                alunoDTO.getSerie(),
                alunoDTO.getTurma(),
                alunoDTO.getAnoLetivo()
        );

        Aluno alunoCadastrado = alunoService.cadastrarAluno(aluno);
        return AlunoDTO.fromAluno(alunoCadastrado);
    }

    @GetMapping
    public List<AlunoDTO> listarAlunos() {
        List<Aluno> alunos = alunoService.listarAlunos();
        return alunos.stream()
                .map(AlunoDTO::fromAluno)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{matricula}")
    public void excluirAluno(@PathVariable String matricula) {
        alunoService.excluirAluno(matricula);
    }
}