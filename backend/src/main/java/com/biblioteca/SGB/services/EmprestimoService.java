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

    public List<Emprestimo> listarEmprestimos(){ return emprestimoRepository.findAll(); }

    public Emprestimo getEmprestimoById(int id){ return emprestimoRepository.findById(id).get(); }

    public String calcularStatus(Emprestimo emprestimo){

        if("Extraviado".equals(emprestimo.getStatus())) { return "Extraviado"; }

        if("Devolvido".equals(emprestimo.getStatus())) { return "Devolvido"; }

        if(emprestimo.getDataPrevistaDevolucao().isBefore(LocalDate.now()) && emprestimo.getDataDevolucao() == null) { return "Atrasado"; }

        return "Pendente";
    }

}
