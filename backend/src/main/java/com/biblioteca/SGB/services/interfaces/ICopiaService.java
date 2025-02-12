package com.biblioteca.SGB.services.interfaces;

import com.biblioteca.SGB.models.Copia;

import java.util.List;

public interface ICopiaService {

    Copia cadastrarCopia(Copia copia, String isbnEdicao);

    List<Copia> listarCopias(String isbnEdicao);

    void excluirCopia(int id);
}
