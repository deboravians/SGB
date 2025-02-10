package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.dto.AlunoRankingDTO;
import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.AlunoMapper;
import com.biblioteca.SGB.mapper.AlunoRankingMapper;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.AlunoService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping()
    public AlunoDTO cadastrarAluno(@RequestBody AlunoDTO alunoDTO) {

        Aluno aluno = AlunoMapper.toModel(alunoDTO);

        Aluno alunoCadastrado = alunoService.cadastrarAluno(aluno);
        return AlunoMapper.toDTO(alunoCadastrado);
    }

    @GetMapping
    public List<AlunoDTO> listarAlunos() {
        List<Aluno> alunos = alunoService.listarAlunos();
        return alunos.stream()
                .map(AlunoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{matricula}")
    public void excluirAluno(@PathVariable String matricula) {
        alunoService.excluirAluno(matricula);
    }

    @PutMapping("/{matricula}")
    public AlunoDTO atualizarAluno(@PathVariable String matricula, @RequestBody AlunoDTO alunoDTO) {

        Aluno aluno = AlunoMapper.toModel(alunoDTO);

        Aluno alunoAtualizado = alunoService.atualizarAluno(matricula, aluno);
        return AlunoMapper.toDTO(alunoAtualizado);
    }

    @GetMapping("/topAlunos")
    public List<AlunoRankingDTO> listarTopAlunos(@RequestParam String dataInicio, @RequestParam String dataFim){

        LocalDate dataInicioConv = formatarData(dataInicio);
        LocalDate dataFimConv = formatarData(dataFim);

        List<Object[]> topAlunos = alunoService.listarTopAlunos(dataInicioConv, dataFimConv);

        return topAlunos.stream()
                .map(AlunoRankingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/emprestimos/{matricula}")
    public List<EmprestimoDTO> listarEmprestimosAlunos(@PathVariable String matricula) {

        List<Emprestimo> emprestimosAlunos = alunoService.listarEmprestimosAlunos(matricula);
        return emprestimosAlunos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/perfil/{matricula}")
    public AlunoDTO perfilAluno(@PathVariable String matricula) {
        Aluno aluno = alunoService.perfilAluno(matricula);

        return AlunoMapper.toDTO(aluno);
    }

}