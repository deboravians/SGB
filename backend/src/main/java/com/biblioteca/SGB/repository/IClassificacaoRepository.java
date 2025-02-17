package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Classificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClassificacaoRepository extends JpaRepository<Classificacao, String>{
}