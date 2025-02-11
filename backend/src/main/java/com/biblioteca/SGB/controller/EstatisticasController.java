package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.AlunoRankingDTO;
import com.biblioteca.SGB.mapper.AlunoRankingMapper;
import com.biblioteca.SGB.services.AlunoService;
import com.biblioteca.SGB.services.CopiaService;
import com.biblioteca.SGB.services.EstatisticasService;
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

    @Autowired
    EstatisticasService estatisticasService;

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

}
