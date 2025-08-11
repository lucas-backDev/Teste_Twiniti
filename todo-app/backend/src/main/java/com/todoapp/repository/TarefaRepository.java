package com.todoapp.repository;

import com.todoapp.model.StatusTarefa;
import com.todoapp.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * COMMIT 3: Criação do Repository
 * 
 * Interface que estende JpaRepository para operações CRUD
 * Contém métodos customizados para consultas específicas
 */
@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    
    /**
     * Busca tarefas por status
     * @param status Status da tarefa a ser filtrada
     * @return Lista de tarefas com o status especificado
     */
    List<Tarefa> findByStatus(StatusTarefa status);
    
    /**
     * Busca tarefas por título (busca parcial, case insensitive)
     * @param titulo Título ou parte do título a ser buscado
     * @return Lista de tarefas que contêm o título especificado
     */
    @Query("SELECT t FROM Tarefa t WHERE LOWER(t.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))")
    List<Tarefa> findByTituloContainingIgnoreCase(@Param("titulo") String titulo);
    
    /**
     * Busca todas as tarefas ordenadas por data de criação (mais recentes primeiro)
     * @return Lista de tarefas ordenadas por data de criação decrescente
     */
    @Query("SELECT t FROM Tarefa t ORDER BY t.dataCriacao DESC")
    List<Tarefa> findAllOrderByDataCriacaoDesc();
    
    /**
     * Conta o número de tarefas por status
     * @param status Status das tarefas a serem contadas
     * @return Número de tarefas com o status especificado
     */
    long countByStatus(StatusTarefa status);
}
