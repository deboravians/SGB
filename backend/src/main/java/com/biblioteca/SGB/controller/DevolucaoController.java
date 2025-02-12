package com.biblioteca.SGB.controller;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.services.DevolucaoService;
import com.biblioteca.SGB.services.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}