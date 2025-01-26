package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Edicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EdicaoRepository extends JpaRepository<Edicao, String> {
    Optional<Edicao> findByTitulo(String titulo);}

