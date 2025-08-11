package com.todoapp.model;

/**
 * COMMIT 2: Criação do enum StatusTarefa
 * 
 * Enum que define os possíveis status de uma tarefa
 * Utilizado para garantir consistência nos dados
 */
public enum StatusTarefa {
    PENDENTE("Pendente"),
    EM_ANDAMENTO("Em Andamento"),
    CONCLUIDA("Concluída");
    
    private final String descricao;
    
    StatusTarefa(String descricao) {
        this.descricao = descricao;
    }
    
    public String getDescricao() {
        return descricao;
    }
}
