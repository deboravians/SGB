package com.biblioteca.SGB.repository;

import com.biblioteca.SGB.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, String> {

    @Query("SELECT COUNT(p) FROM Professor p")
    int countProfessores();

}
