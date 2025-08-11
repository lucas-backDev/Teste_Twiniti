package com.todoapp.controller;

import com.todoapp.model.StatusTarefa;
import com.todoapp.model.Tarefa;
import com.todoapp.service.TarefaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * COMMIT 5: Criação do Controller REST
 * 
 * Controller REST que expõe os endpoints da API
 * Implementa todas as operações CRUD para tarefas
 */
@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin(origins = "http://localhost:3000") // Permite requisições do frontend
public class TarefaController {
    
    @Autowired
    private TarefaService tarefaService;
    
    /**
     * GET /api/tarefas - Lista todas as tarefas
     * @param status Filtro opcional por status
     * @param titulo Filtro opcional por título
     * @return Lista de tarefas
     */
    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTarefas(
            @RequestParam(required = false) StatusTarefa status,
            @RequestParam(required = false) String titulo) {
        
        try {
            List<Tarefa> tarefas;
            
            if (status != null) {
                tarefas = tarefaService.filtrarPorStatus(status);
            } else if (titulo != null && !titulo.trim().isEmpty()) {
                tarefas = tarefaService.buscarPorTitulo(titulo);
            } else {
                tarefas = tarefaService.listarTodas();
            }
            
            return ResponseEntity.ok(tarefas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/tarefas/{id} - Busca uma tarefa por ID
     * @param id ID da tarefa
     * @return Tarefa encontrada ou 404 se não existir
     */
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefa(@PathVariable Long id) {
        try {
            Optional<Tarefa> tarefa = tarefaService.buscarPorId(id);
            
            if (tarefa.isPresent()) {
                return ResponseEntity.ok(tarefa.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * POST /api/tarefas - Cria uma nova tarefa
     * @param tarefa Dados da tarefa a ser criada
     * @return Tarefa criada com status 201
     */
    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@Valid @RequestBody Tarefa tarefa) {
        try {
            Tarefa novaTarefa = tarefaService.criar(tarefa);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * PUT /api/tarefas/{id} - Atualiza uma tarefa existente
     * @param id ID da tarefa a ser atualizada
     * @param tarefa Dados atualizados da tarefa
     * @return Tarefa atualizada ou 404 se não existir
     */
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @Valid @RequestBody Tarefa tarefa) {
        try {
            Tarefa tarefaAtualizada = tarefaService.atualizar(id, tarefa);
            return ResponseEntity.ok(tarefaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * DELETE /api/tarefas/{id} - Exclui uma tarefa
     * @param id ID da tarefa a ser excluída
     * @return Status 204 se excluída com sucesso ou 404 se não existir
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        try {
            tarefaService.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/tarefas/estatisticas - Obtém estatísticas das tarefas
     * @return Objeto com contadores por status
     */
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Long>> obterEstatisticas() {
        try {
            long[] stats = tarefaService.obterEstatisticas();
            
            Map<String, Long> estatisticas = new HashMap<>();
            estatisticas.put("pendentes", stats[0]);
            estatisticas.put("emAndamento", stats[1]);
            estatisticas.put("concluidas", stats[2]);
            estatisticas.put("total", stats[0] + stats[1] + stats[2]);
            
            return ResponseEntity.ok(estatisticas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
