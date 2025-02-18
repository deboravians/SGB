package com.biblioteca.SGB.services.interfaces;

import java.time.LocalDate;
import java.util.List;

public interface IEstatisticasService {

    List<Object[]> listarTopAlunos(LocalDate dataInicio, LocalDate dataFim);

    int countTotalCopias();
    int countCopiasDisponiveis();
    int countTotalEmprestimos();
    int countProfessores();
    int countAlunos();
    int countLeitores();
    int countEmprestimosAtivos();
    int countEmprestimosAtrasados();
}