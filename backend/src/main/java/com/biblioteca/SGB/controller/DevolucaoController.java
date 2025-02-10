package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoDTO;
import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.AlunoMapper;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Aluno;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.DevolucaoService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    @Autowired
    private DevolucaoService devolucaoService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping
    public EmprestimoDTO registrarDevolucao(@RequestBody EmprestimoDTO emprestimoDTO, @RequestParam Integer id){

        Emprestimo devolucao = emprestimoService.getEmprestimoById(id);
        devolucao.setDataDevolucao(formatarData(emprestimoDTO.getDataDevolucao()));

        Emprestimo novaDevolucao = devolucaoService.registrarDevolucao(devolucao);

        return EmprestimoMapper.toDTO(novaDevolucao, emprestimoService.calcularStatus(novaDevolucao));
    }

    @GetMapping("/alunos")
    public List<EmprestimoDTO> listarDevolucaoAlunos(){
        List<Emprestimo> emprestimos = devolucaoService.listarDevolucoesAlunos();
        return emprestimos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/professores")
    public List<EmprestimoDTO> listarDevolucaoProfessores(){
        List<Emprestimo> emprestimos = devolucaoService.listarDevolucoesProfessores();
        return emprestimos.stream()
                .map(emprestimo -> EmprestimoMapper.toDTO(emprestimo, emprestimoService.calcularStatus(emprestimo)))
                .collect(Collectors.toList());
    }
}