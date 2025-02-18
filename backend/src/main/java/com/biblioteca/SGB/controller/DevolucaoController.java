package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.interfaces.IDevolucaoService;
import com.biblioteca.SGB.services.interfaces.IEmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

@RestController
@RequestMapping("/devolucoes")
public class DevolucaoController {

    private final IDevolucaoService devolucaoService;
    private final IEmprestimoService emprestimoService;

    @Autowired
    public DevolucaoController(IDevolucaoService devolucaoService,
                               IEmprestimoService emprestimoService) {
        this.devolucaoService = devolucaoService;
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public EmprestimoDTO registrarDevolucao(@RequestBody EmprestimoDTO emprestimoDTO, @RequestParam Integer id){

        Emprestimo devolucao = emprestimoService.getEmprestimo(id);
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