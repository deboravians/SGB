package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public Emprestimo aumentarPrazo(Integer idEmprestimo){

        Emprestimo emprestimo = emprestimoRepository.findById(idEmprestimo)
                .orElseThrow(() -> new RuntimeException("Emprestimo não encontrado no banco"));

        if(calcularStatus(emprestimo).equals("Extraviado")) {
            throw new IllegalArgumentException("Esse emprestimo encontra-se como extraviado.");
        }

        if(calcularStatus(emprestimo).equals("Devolvido")) {
            throw new IllegalArgumentException("Esse emprestimo encontra-se como devolvido.");
        }

        if(emprestimo.getAluno() == null) {
            emprestimo.setDataPrevistaDevolucao(emprestimo.getDataPrevistaDevolucao().plusDays(30));
        }

        if(emprestimo.getProfessor() == null) {
            emprestimo.setDataPrevistaDevolucao(emprestimo.getDataPrevistaDevolucao().plusDays(7));
        }

        return emprestimoRepository.save(emprestimo);

    }

    public List<Emprestimo> listarEmprestimos(){ return emprestimoRepository.findAll(); }

    public Emprestimo getEmprestimoById(int id){ return emprestimoRepository.findById(id).get(); }

    public String calcularStatus(Emprestimo emprestimo){

        if("Extraviado".equals(emprestimo.getStatus())) { return "Extraviado"; }

        if("Devolvido".equals(emprestimo.getStatus())) { return "Devolvido"; }

        if(emprestimo.getDataPrevistaDevolucao().isBefore(LocalDate.now()) && emprestimo.getDataDevolucao() == null) { return "Atrasado"; }

        return "Em Andamento";
    }

    public void excluirEmprestimo(Integer idEmprestimo) {

        if(!emprestimoRepository.existsById(idEmprestimo)) {
            throw new IllegalStateException("Empréstimo com  " + idEmprestimo + " não encontrado.");
        }
        emprestimoRepository.deleteById(idEmprestimo);
    }
}
