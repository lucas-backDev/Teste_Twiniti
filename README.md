# 📝 Gerenciador de Tarefas (To-Do List)

## ✨ Visão Geral do Projeto

Este é um sistema completo de gerenciamento de tarefas (To-Do List) desenvolvido para demonstrar a integração entre um backend robusto em Java Spring Boot e um frontend moderno em React/Next.js. A aplicação permite aos usuários adicionar, listar, editar, excluir e filtrar tarefas de forma intuitiva e eficiente.

O projeto foi construído com foco em boas práticas de desenvolvimento, responsividade, design moderno e escalabilidade, incluindo diferenciais como Docker, testes unitários e pipelines de CI/CD.

---

## 💡 Funcionalidades Implementadas

### Backend (API REST - Spring Boot)
-   ✅ **CRUD Completo para Tarefas**: Operações de Criação, Leitura, Atualização e Exclusão.
-   ✅ **Persistência de Dados**: Armazenamento de tarefas em um banco de dados PostgreSQL.
-   ✅ **Mapeamento Objeto-Relacional**: Utilização do Hibernate (via Spring Data JPA) para gerenciar a interação com o banco.
-   ✅ **Validação de Dados**: Campos validados para garantir a integridade das informações.
-   ✅ **Filtros Avançados**: Filtragem de tarefas por `status` e busca por `título`.
-   ✅ **Estatísticas de Tarefas**: Endpoint para obter contagens de tarefas por status (pendentes, em andamento, concluídas).
-   ✅ **Configuração CORS**: Permite a comunicação segura entre o frontend e o backend.

### Frontend (Interface do Usuário - React/Next.js)
-   ✅ **Listagem Dinâmica de Tarefas**: Exibição clara e organizada de todas as tarefas.
-   ✅ **Formulário de Adição/Edição**: Interface intuitiva para criar novas tarefas ou modificar existentes.
-   ✅ **Exclusão de Tarefas**: Funcionalidade para remover tarefas da lista.
-   ✅ **Filtros Interativos**: Filtragem de tarefas por status (Pendente, Em Andamento, Concluída) e busca por título em tempo real.
-   ✅ **Dashboard de Estatísticas**: Visão geral do progresso das tarefas com contadores e barra de progresso.
-   ✅ **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela (desktop, tablet, mobile).
-   ✅ **Feedback Visual**: Mensagens de carregamento, sucesso e erro para uma melhor experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

### Backend
-   **Linguagem**: Java
-   **Framework**: Spring Boot
-   **ORM**: Spring Data JPA (Hibernate)
-   **Banco de Dados**: PostgreSQL
-   **Gerenciador de Dependências**: Maven

### Frontend
-   **Framework**: Next.js (com React)
-   **Linguagem**: TypeScript
-   **Estilização**: Tailwind CSS
-   **Componentes UI**: shadcn/ui
-   **Ícones**: Lucide React
-   **Gerenciador de Pacotes**: npm

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação em sua máquina.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   **Java Development Kit (JDK) 17 ou superior**:
    -   Verifique: `java -version`
    -   Download: [Adoptium OpenJDK](https://adoptium.net/)
-   **Apache Maven 3.6 ou superior**:
    -   Verifique: `mvn -version`
    -   Download: [Apache Maven](https://maven.apache.org/download.cgi)
-   **Node.js 18 ou superior (com npm)**:
    -   Verifique: `node -v` e `npm -v`
    -   Download: [Node.js](https://nodejs.org/)
-   **PostgreSQL 12 ou superior**:
    -   Verifique: `psql --version`
    -   Download: [PostgreSQL](https://www.postgresql.org/download/)
-   **Git**: Para clonar o repositório.

### 🗄️ 1. Configuração do Banco de Dados (PostgreSQL)

1.  **Inicie o serviço do PostgreSQL** em sua máquina.
2.  **Abra um terminal** (CMD, PowerShell, Git Bash) e conecte-se ao PostgreSQL como superusuário (geralmente `postgres`):
    \`\`\`bash
    psql -U postgres
    \`\`\`
    *   Será solicitada a senha do usuário `postgres` que você definiu durante a instalação.

3.  **Crie o banco de dados e um usuário (opcional, mas recomendado)**:
    \`\`\`sql
    -- Criar o banco de dados para a aplicação
    CREATE DATABASE todoapp;

    -- Criar um usuário específico para a aplicação (opcional, pode usar 'postgres' se preferir)
    CREATE USER seu_user WITH PASSWORD 'sua_senha';

    -- Conceder todas as permissões no banco de dados ao novo usuário
    GRANT ALL PRIVILEGES ON DATABASE todoapp TO seu_user;

    -- Conectar ao banco de dados recém-criado
    \c todoapp;

    -- Conceder permissões no esquema 'public' (onde as tabelas serão criadas)
    GRANT ALL ON SCHEMA public TO seu_user;

    -- Sair do psql
    \q
    \`\`\`
    **⚠️ IMPORTANTE:** Anote a senha (`sua_senha`) e o usuário (`seu_user` ou `postgres`), pois você precisará deles para configurar o backend.

### 🏗️ 2. Configuração e Execução do Backend

**CLONE O REPOSITÓRIO DA FORMA QUE PREFERIR**

1.  **Navegue até a pasta `backend`** do projeto:
    \`\`\`bash
    cd todo-app/backend
    \`\`\`
2.  **Ajuste as credenciais do banco de dados**:
    *   Abra o arquivo `src/main/resources/application.properties`.
    *   Localize as linhas `spring.datasource.username` e `spring.datasource.password`.
    *   **Substitua `SUA_SENHA_AQUI`** pela senha do usuário do banco de dados que você está usando (ex: `postgres` ou `seu_user`).
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/todoapp
    spring.datasource.username=postgres # Ou todoapp_user
    spring.datasource.password=SUA_SENHA_AQUI
    \`\`\`
3.  **Compile e execute a aplicação Spring Boot**:

    \`\`\`bash
    mvn clean compile # Limpa e compila o projeto


    mvn spring-boot:run # Executa a aplicação
    \`\`\`
    *   O Hibernate criará automaticamente a tabela `tarefas` no seu banco de dados `todoapp`.
    *   O backend estará disponível em `http://localhost:8080/api/tarefas`.

### 🎨 3. Configuração e Execução do Frontend

1.  **Abra um NOVO terminal** (mantenha o terminal do backend rodando).
2.  **Navegue até a pasta raiz** do projeto:
    \`\`\`bash
    cd todo-app
    \`\`\`
3.  **Instale as dependências do Node.js**:
    \`\`\`bash
    npm install
    \`\`\`
4.  **Execute a aplicação Next.js em modo de desenvolvimento**:
    \`\`\`bash
    npm run dev
    \`\`\`
    *   O frontend estará disponível em `http://localhost:3000`.

### ✅ 4. Teste a Aplicação Completa

1.  Abra seu navegador e acesse: `http://localhost:3000`
2.  Interaja com a aplicação:
    *   Adicione novas tarefas.
    *   Edite tarefas existentes.
    *   Altere o status das tarefas.
    *   Exclua tarefas.
    *   Use os filtros de status e a busca por título.
    *   Observe as estatísticas sendo atualizadas em tempo real.

---

## 🌐 Endpoints da API (Backend)

Todos os endpoints estão sob a base `http://localhost:8080/api/tarefas`.

-   **`GET /api/tarefas`**: Lista todas as tarefas.
    -   Parâmetros de query: `?status=PENDENTE` (ou `EM_ANDAMENTO`, `CONCLUIDA`), `?titulo=texto`
-   **`GET /api/tarefas/{id}`**: Busca uma tarefa por ID.
-   **`POST /api/tarefas`**: Cria uma nova tarefa.
    -   Body (JSON): `{ "titulo": "...", "descricao": "...", "status": "PENDENTE" }`
-   **`PUT /api/tarefas/{id}`**: Atualiza uma tarefa existente.
    -   Body (JSON): `{ "titulo": "...", "descricao": "...", "status": "CONCLUIDA" }` (campos opcionais)
-   **`DELETE /api/tarefas/{id}`**: Exclui uma tarefa.
-   **`GET /api/tarefas/estatisticas`**: Retorna contagens de tarefas por status.

---

## 📊 Estrutura de Dados

### Objeto `Tarefa`
\`\`\`json
{
  "id": 1,
  "titulo": "Comprar mantimentos",
  "descricao": "Leite, pão, ovos, frutas e vegetais.",
  "status": "PENDENTE", // Pode ser "PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"
  "dataCriacao": "2024-07-20T10:00:00",
  "dataAtualizacao": "2024-07-20T10:00:00"
}
\`\`\`

### Objeto `Estatisticas`
\`\`\`json
{
  "pendentes": 5,
  "emAndamento": 2,
  "concluidas": 8,
  "total": 15
}
\`\`\`

---
