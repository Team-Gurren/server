# QRFood - API de Gestão de Alunos e Almoços

Este é um sistema de gestão de alunos e almoços. A API oferece rotas para registrar, atualizar e consultar dados de alunos e almoços, assim como associar almoços a alunos.

## Rotas da API

### 1. **Rotas de Alunos**

- **GET /aluno/matricula/:matricula**
  - **Descrição**: Retorna os dados de um aluno com base na matrícula.
  - **Exemplo**: `GET http://localhost:3000/aluno/matricula/11313`

- **GET /aluno/cpf/:cpf**
  - **Descrição**: Retorna os dados de um aluno com base no CPF.
  - **Exemplo**: `GET http://localhost:3000/aluno/cpf/12545578931`

- **GET /aluno**
  - **Descrição**: Retorna a lista de todos os alunos.
  - **Exemplo**: `GET http://localhost:3000/aluno`

- **POST /aluno**
  - **Descrição**: Cria um novo aluno no sistema.
  - **Exemplo**:
    ```json
    POST http://localhost:3000/aluno
    {
        "nome": "João da Silva",
        "matricula": "11313",
        "turma": "1a",
        "cpf": "12545578931",
        "dataNascimento": "2000-01-01",
        "telefone": "11987654321",
        "endereco": "Rua das Flores, 123"
    }
    ```

- **PATCH /aluno/:id**
  - **Descrição**: Atualiza os dados de um aluno existente.
  - **Exemplo**:
    ```json
    PATCH http://localhost:3000/aluno/1
    {
        "nome": "Pedro Machado",
        "matricula": "1111",
        "turma": "1a",
        "cpf": "12345278911",
        "dataNascimento": "2000-01-01",
        "telefone": "11987654321",
        "endereco": "Rua das Flores, 123"
    }
    ```

- **DELETE /aluno/:id**
  - **Descrição**: Exclui um aluno do sistema.
  - **Exemplo**: `DELETE http://localhost:3000/aluno/1`


- **GET /aluno/forgot/:cpf**
  - **Descrição**: Retorna matricula do aluno.
  - **Exemplo**:
    ```json
    GET http://localhost:3000/forgot/1111111
    {
        1010
    }
    ```

---

### 2. **Rotas de Almoços**

- **POST /almocos/criar**
  - **Descrição**: Cria um novo registro de almoço.
  - **Exemplo**:
    ```json
    POST http://localhost:3000/almocos/criar
    {
      "vendings": []
    }
    ```

- **GET /almocos/id/:id**
  - **Descrição**: Retorna os detalhes de um almoço específico com base no ID.
  - **Exemplo**: `GET http://localhost:3000/almocos/id/1010`

- **POST /almocos/aluno**
  - **Descrição**: Associa um aluno a um almoço específico.
  - **Exemplo**:
    ```json
    POST http://localhost:3000/almocos/aluno
    {
      "id": 1010
    }
    ```

- **GET /almocos/hoje**
  - **Descrição**: Retorna os almoços disponíveis para o dia de hoje.
  - **Exemplo**: `GET http://localhost:3000/almocos/hoje`

---

### 3. Login Aluno
- **POST auth/login**
  - **Descrição**: Loga o aluno ao sistema.
  - **Exemplo**:
    ```json
    POST http://localhost:3000/auth/login
    {
      "matricula" : "1111",
      "cpf" : "12345278911"
    }

    ```

### Notas Importantes:
- Todos os endpoints requerem um servidor em execução na URL `http://localhost:3000/`.
- Os exemplos acima consideram que você está enviando requisições HTTP para a API.
- Para a rota `POST /almocos/criar`, o campo `"vendings"` é uma lista de objetos que representariam os itens disponíveis no almoço. A estrutura exata depende da implementação.

--- 
