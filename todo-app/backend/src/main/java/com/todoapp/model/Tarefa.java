package com.todoapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * COMMIT 2: Criação da entidade Tarefa
 * 
 * Entidade JPA que representa uma tarefa no sistema
 * Mapeada para a tabela 'tarefas' no banco de dados
 */
@Entity
@Table(name = "tarefas")
public class Tarefa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O título é obrigatório")
    @Column(nullable = false, length = 100)
    private String titulo;
    
    @Column(length = 500)
    private String descricao;
    
    @NotNull(message = "O status é obrigatório")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusTarefa status;
    
    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;
    
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
    
    // Construtor padrão necessário para o JPA
    public Tarefa() {
        this.dataCriacao = LocalDateTime.now();
        this.status = StatusTarefa.PENDENTE;
    }
    
    // Construtor com parâmetros
    public Tarefa(String titulo, String descricao, StatusTarefa status) {
        this();
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status != null ? status : StatusTarefa.PENDENTE;
    }
    
    // Método executado antes de atualizar a entidade
    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public StatusTarefa getStatus() {
        return status;
    }
    
    public void setStatus(StatusTarefa status) {
        this.status = status;
        this.dataAtualizacao = LocalDateTime.now();
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }
    
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}
