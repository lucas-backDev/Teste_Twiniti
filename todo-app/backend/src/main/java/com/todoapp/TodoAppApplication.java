package com.todoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * COMMIT 1: Configuração inicial do Spring Boot
 * 
 * Classe principal da aplicação Spring Boot
 * Responsável por inicializar toda a aplicação
 */
@SpringBootApplication
public class TodoAppApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(TodoAppApplication.class, args);
    }
}
