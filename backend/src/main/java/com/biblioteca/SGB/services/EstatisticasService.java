package com.biblioteca.SGB.services;

import com.biblioteca.SGB.repository.AlunoRepository;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import com.biblioteca.SGB.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EstatisticasService{

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public List<Object[]> listarTopAlunos(LocalDate dataInicio, LocalDate dataFim){
        return emprestimoRepository.findTopAlunosByPeriod(dataInicio, dataFim);
    }

    public int countTotalCopias() { return copiaRepository.countTotalCopias(); }

    public int countCopiasDisponiveis() { return copiaRepository.countCopiasDisponiveis(); }

    public int countTotalEmprestimos(){ return copiaRepository.countCopiasEmprestadas(); }

    public int countProfessores() { return professorRepository.countProfessores(); }

    public int countAlunos() { return alunoRepository.countAlunos(); }

    public int countLeitores() { return countProfessores() + countAlunos(); }

    public int countEmprestimosAtivos() { return emprestimoRepository.countEmprestimosAtivos(); }

}
