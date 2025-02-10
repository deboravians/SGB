package com.biblioteca.SGB.services;

import com.biblioteca.SGB.dto.EmprestimoDTO;
import com.biblioteca.SGB.mapper.EmprestimoMapper;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.models.Emprestimo;
import com.biblioteca.SGB.repository.EdicaoRepository;
import com.biblioteca.SGB.repository.EmprestimoRepository;
import com.biblioteca.SGB.repository.CopiaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private CopiaRepository copiaRepository;

    @Autowired
    private EdicaoRepository edicaoRepository;

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

    public Emprestimo registrarExtravio(Integer idEmprestimo){

        Emprestimo emprestimo = emprestimoRepository.findById(idEmprestimo)
                .orElseThrow(() -> new RuntimeException("Emprestimo não encontrado no banco"));

        if(calcularStatus(emprestimo).equals("Extraviado")) {
            throw new IllegalArgumentException("Esse emprestimo já encontra-se como extraviado.");
        }

        if(calcularStatus(emprestimo).equals("Devolvido")) {
            throw new IllegalArgumentException("Esse emprestimo já encontra-se como devolvido, assim não pode ser marcado como extraviado.");
        }

        Copia copia = emprestimo.getCopia();
        copia.setStatus("Extraviada");
        copiaRepository.save(copia);

        emprestimo.setStatus("Extraviado");
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

    public List<Emprestimo> listarEmprestimosEdicao(String isbn){
        Edicao edicao = edicaoRepository.findById(isbn)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma edição com esse isbn."));

        return emprestimoRepository.findByCopiaEdicaoIsbn(isbn);
    }
}
