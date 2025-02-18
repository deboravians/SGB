package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoRankingDTO;
import com.biblioteca.SGB.mapper.AlunoRankingMapper;
import com.biblioteca.SGB.services.interfaces.IEstatisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.biblioteca.SGB.utils.DateUtils.formatarData;

@RestController
@RequestMapping("/estatisticas")
public class EstatisticasController{

    private final IEstatisticasService estatisticasService;

    @Autowired
    public EstatisticasController(IEstatisticasService estatisticasService) {
        this.estatisticasService = estatisticasService;
    }

    @GetMapping("/topAlunos")
    public List<AlunoRankingDTO> listarTopAlunos(@RequestParam String dataInicio, @RequestParam String dataFim){

        LocalDate dataInicioConv = formatarData(dataInicio);
        LocalDate dataFimConv = formatarData(dataFim);

        List<Object[]> topAlunos = estatisticasService.listarTopAlunos(dataInicioConv, dataFimConv);

        return topAlunos.stream()
                .map(AlunoRankingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/copias/totalCadastrado")
    public int countTotalCopias() { return estatisticasService.countTotalCopias(); }

    @GetMapping("/copias/totalDisponivel")
    public int countCopiasDisponiveis() { return estatisticasService.countCopiasDisponiveis(); }

    @GetMapping("/copias/totalEmprestado")
    public int countTotalEmprestimos() { return estatisticasService.countTotalEmprestimos(); }

    @GetMapping("/professores/totalCadastrado")
    public int countProfessores() { return estatisticasService.countProfessores(); }

    @GetMapping("/alunos/totalCadastrado")
    public int countAlunos() { return estatisticasService.countAlunos(); }

    @GetMapping("/leitores/totalCadastrado")
    public int countLeitores() { return estatisticasService.countLeitores(); }

    @GetMapping("/emprestimos/totalAtivo")
    public int countEmprestimosAtivos() { return estatisticasService.countEmprestimosAtivos(); }

    @GetMapping("/emprestimos/totalAtrasado")
    public int countEmprestimosAtrasados() { return estatisticasService.countEmprestimosAtrasados(); }
}