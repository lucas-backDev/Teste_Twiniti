package com.todoapp.service;

import com.todoapp.model.StatusTarefa;
import com.todoapp.model.Tarefa;
import com.todoapp.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * COMMIT 4: Criação do Service
 * 
 * Classe de serviço que contém a lógica de negócio
 * Intermediária entre o Controller e o Repository
 */
@Service
public class TarefaService {
    
    @Autowired
    private TarefaRepository tarefaRepository;
    
    /**
     * Lista todas as tarefas ordenadas por data de criação
     * @return Lista de todas as tarefas
     */
    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAllOrderByDataCriacaoDesc();
    }
    
    /**
     * Busca uma tarefa por ID
     * @param id ID da tarefa
     * @return Optional contendo a tarefa se encontrada
     */
    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }
    
    /**
     * Cria uma nova tarefa
     * @param tarefa Dados da tarefa a ser criada
     * @return Tarefa criada com ID gerado
     */
    public Tarefa criar(Tarefa tarefa) {
        // Validações de negócio
        if (tarefa.getTitulo() == null || tarefa.getTitulo().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório");
        }
        
        // Define status padrão se não informado
        if (tarefa.getStatus() == null) {
            tarefa.setStatus(StatusTarefa.PENDENTE);
        }
        
        return tarefaRepository.save(tarefa);
    }
    
    /**
     * Atualiza uma tarefa existente
     * @param id ID da tarefa a ser atualizada
     * @param tarefaAtualizada Dados atualizados da tarefa
     * @return Tarefa atualizada
     * @throws RuntimeException se a tarefa não for encontrada
     */
    public Tarefa atualizar(Long id, Tarefa tarefaAtualizada) {
        Optional<Tarefa> tarefaExistente = tarefaRepository.findById(id);
        
        if (tarefaExistente.isEmpty()) {
            throw new RuntimeException("Tarefa não encontrada com ID: " + id);
        }
        
        Tarefa tarefa = tarefaExistente.get();
        
        // Atualiza apenas os campos fornecidos
        if (tarefaAtualizada.getTitulo() != null) {
            tarefa.setTitulo(tarefaAtualizada.getTitulo());
        }
        
        if (tarefaAtualizada.getDescricao() != null) {
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
        }
        
        if (tarefaAtualizada.getStatus() != null) {
            tarefa.setStatus(tarefaAtualizada.getStatus());
        }
        
        return tarefaRepository.save(tarefa);
    }
    
    /**
     * Exclui uma tarefa
     * @param id ID da tarefa a ser excluída
     * @throws RuntimeException se a tarefa não for encontrada
     */
    public void excluir(Long id) {
        if (!tarefaRepository.existsById(id)) {
            throw new RuntimeException("Tarefa não encontrada com ID: " + id);
        }
        
        tarefaRepository.deleteById(id);
    }
    
    /**
     * Filtra tarefas por status
     * @param status Status das tarefas a serem filtradas
     * @return Lista de tarefas com o status especificado
     */
    public List<Tarefa> filtrarPorStatus(StatusTarefa status) {
        return tarefaRepository.findByStatus(status);
    }
    
    /**
     * Busca tarefas por título
     * @param titulo Título ou parte do título a ser buscado
     * @return Lista de tarefas que contêm o título especificado
     */
    public List<Tarefa> buscarPorTitulo(String titulo) {
        return tarefaRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    /**
     * Obtém estatísticas das tarefas
     * @return Array com contadores [pendentes, em_andamento, concluidas]
     */
    public long[] obterEstatisticas() {
        long pendentes = tarefaRepository.countByStatus(StatusTarefa.PENDENTE);
        long emAndamento = tarefaRepository.countByStatus(StatusTarefa.EM_ANDAMENTO);
        long concluidas = tarefaRepository.countByStatus(StatusTarefa.CONCLUIDA);
        
        return new long[]{pendentes, emAndamento, concluidas};
    }
}
