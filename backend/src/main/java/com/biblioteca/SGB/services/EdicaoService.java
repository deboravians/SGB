package com.biblioteca.SGB.services;

import com.biblioteca.SGB.models.Classificacao;
import com.biblioteca.SGB.models.Copia;
import com.biblioteca.SGB.models.Edicao;
import com.biblioteca.SGB.repository.interfaces.ClassificacaoRepository;
import com.biblioteca.SGB.repository.CopiaRepository;
import com.biblioteca.SGB.repository.interfaces.EdicaoRepository;
import com.biblioteca.SGB.services.interfaces.ICopiaService;
import com.biblioteca.SGB.services.interfaces.IEdicaoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EdicaoService implements IEdicaoService {

    private final EdicaoRepository edicaoRepository;
    private final ClassificacaoRepository classificacaoRepository;
    private final CopiaRepository copiaRepository;
    private final ICopiaService copiaService;

    @Autowired
    public EdicaoService(EdicaoRepository edicaoRepository,
                         ClassificacaoRepository classificacaoRepository,
                         CopiaRepository copiaRepository,
                         ICopiaService copiaService) {
        this.edicaoRepository = edicaoRepository;
        this.classificacaoRepository = classificacaoRepository;
        this.copiaRepository = copiaRepository;
        this.copiaService = copiaService;
    }

    public Edicao cadastrarEdicao(Edicao edicao, String classificacao_codigo) {

        if (edicaoRepository.findById(edicao.getIsbn()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma edicao com este ISBN.");
        }

        Classificacao classificacao = classificacaoRepository.findById(classificacao_codigo)
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        edicao.setClassificacao(classificacao);

        return edicaoRepository.save(edicao);
    }

    public List<Edicao> listarEdicoes(){
        return edicaoRepository.findAll();
    }

    public void excluirEdicao(String isbn) {

        if(copiaRepository.existsByEdicaoIsbn(isbn)){
            throw new IllegalArgumentException("A edição possui cópias associadas e não pode ser excluída.");
        }

        if(!edicaoRepository.existsById(isbn)) {
            throw new IllegalStateException("Edição com ISBN " + isbn + " não encontrada.");
        }

        edicaoRepository.deleteById(isbn);
    }

    public Edicao atualizarEdicao(String isbn, Edicao edicaoAtualizada, String classificacao_codigo) {

        Edicao edicao = edicaoRepository.findById(isbn)
                .orElseThrow(() -> new EntityNotFoundException("Não existe uma edição com este ISBN."));

        if(!edicao.getIsbn().equals(edicaoAtualizada.getIsbn())) {
            throw new IllegalArgumentException("o ISBN não pode ser alterado");
        }

        Classificacao classificacao = classificacaoRepository.findById(classificacao_codigo)
                .orElseThrow(() -> new RuntimeException("Classificação não encontrada"));

        edicaoAtualizada.setClassificacao(classificacao);

        return edicaoRepository.save(edicaoAtualizada);
    }

    public int calcularQtdCopias(String edicaoIsbn) {
        return copiaService.listarCopias(edicaoIsbn).size();
    }

    public String calcularStatus(String edicaoIsbn) {
        List<Copia> copias = copiaService.listarCopias(edicaoIsbn);

        int cont = 0;
        for(Copia copia : copias){ if(copia.getStatus().equals("Emprestada")){ cont++; } }

        return cont < calcularQtdCopias(edicaoIsbn) ? "Disponível" : "Indisponível";
    }

    public Edicao getEdicao(String isbn) {
        return edicaoRepository.findById(isbn)
                .orElseThrow(() -> new RuntimeException("Edição não encontrada"));
    }
}