package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.interfaces.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EmprestimoRepository;
import com.biblioteca.SGB.services.interfaces.IDevolucaoService;
import com.biblioteca.SGB.services.interfaces.IEmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DevolucaoService implements IDevolucaoService {

    private final EmprestimoRepository emprestimoRepository;
    private final IEmprestimoService emprestimoService;
    private final CopiaRepository copiaRepository;

    @Autowired
    public DevolucaoService(EmprestimoRepository emprestimoRepository,
                            IEmprestimoService emprestimoService,
                            CopiaRepository copiaRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.emprestimoService = emprestimoService;
        this.copiaRepository = copiaRepository;
    }

    public Emprestimo registrarDevolucao(Emprestimo devolucao) {

        if(devolucao.getId() == null){
            throw new IllegalStateException("Emprestimo não encontrado no banco de dados!");
        }

        if("Devolvido".equals(emprestimoService.calcularStatus(devolucao))){
            throw new IllegalStateException("Este empréstimo ja foi devolvido!");
        }

        if("Extraviado".equals(emprestimoService.calcularStatus(devolucao))){
            throw new IllegalStateException("Este empréstimo está com status de extraviado!");
        }

        if(devolucao.getDataDevolucao().isBefore(devolucao.getDataEmprestimo())){
            throw new IllegalArgumentException("A data de devolução não pode ser anterior a data de emprestimo!");
        }
        if(devolucao.getDataDevolucao().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("A data de devolução não pode ser futura.");
        }

        Copia copia = devolucao.getCopia();
        copia.setStatus("Disponível");
        copiaRepository.save(copia);

        devolucao.setStatus("Devolvido");
        devolucao.setCopia(copia);

        return emprestimoRepository.save(devolucao);
    }

    public List<Emprestimo> listarDevolucoesAlunos() {
        return emprestimoRepository.findByAlunoMatriculaIsNotNullAndDataDevolucaoIsNotNull();
    }

    public List<Emprestimo> listarDevolucoesProfessores() {
        return emprestimoRepository.findByProfessorCpfIsNotNullAndDataDevolucaoIsNotNull();
    }
}