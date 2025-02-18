package com.biblioteca.SGB.services;

import com.biblioteca.SGB.repository.interfaces.AlunoRepository;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import com.biblioteca.SGB.repository.interfaces.ProfessorRepository;
import com.biblioteca.SGB.services.interfaces.IEstatisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EstatisticasService implements IEstatisticasService {

    private final AlunoRepository alunoRepository;
    private final EmprestimoRepository emprestimoRepository;
    private final CopiaRepository copiaRepository;
    private final ProfessorRepository professorRepository;

    @Autowired
    public EstatisticasService(AlunoRepository alunoRepository,
                               EmprestimoRepository emprestimoRepository,
                               CopiaRepository copiaRepository,
                               ProfessorRepository professorRepository) {
        this.alunoRepository = alunoRepository;
        this.emprestimoRepository = emprestimoRepository;
        this.copiaRepository = copiaRepository;
        this.professorRepository = professorRepository;
    }

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

    public int countEmprestimosAtrasados() { return emprestimoRepository.countEmprestimosAtrasados(); }
}