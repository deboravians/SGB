package com.biblioteca.SGB.services;

import com.biblioteca.SGB.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EstatisticasService{

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public List<Object[]> listarTopAlunos(LocalDate dataInicio, LocalDate dataFim){
        return emprestimoRepository.findTopAlunosByPeriod(dataInicio, dataFim);
    }
}
