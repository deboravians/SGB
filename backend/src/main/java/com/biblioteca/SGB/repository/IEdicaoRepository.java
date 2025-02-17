package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Edicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEdicaoRepository extends JpaRepository<Edicao, String> {

    boolean existsByClassificacaoCodigo(String codigo);
}