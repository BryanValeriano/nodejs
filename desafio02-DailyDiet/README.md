# Nodejs API Daily Diet

## Sobre o desafio

### Regras da aplicação

- Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível visualizar uma única refeição

- Deve ser possível criar um usuário
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta

- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
- Deve ser possível identificar o usuário entre as requisições

### Rotas e regras de negócio

qual a estrutura (propriedades) que um Usuario deve ter:
- `id` - Identificador único de cada usario (vai ser o valor do cookie)
- `mealsIds` - lista de `id` de refeicoes realizadas pelo usuario


qual a estrutura (propriedades) que uma Refeicao deve ter:
- `id` - Identificador único de cada refeicao.
- `ownerId` - Identificador único do usuario dono da refeicao.
- `title` - Título da refeicao.
- `description` - Descrição detalhada da refeicao.
- `date` - Data e hora que a refeicao foi feita.
- `isDiet` - esta dentro da dieta (booleano).

Rotas:

## /meal routes

- `POST - /meal`
    ```
    body: 
    {
        "name": string,
        "description": string,
        "date": date,
        "isDiet": boolean
        "ownernerId"?: uuid
    }
    response: 
    {
        "mealId": uuid 
    }
    ```
    
- `PUT - /meal/:id`
    ```
    body: 
    {
        "name"?: string,
        "description"?: string,
        "date"?: date,
        "isDiet"?: boolean
    }
    response: 
    {
        "mealId": uuid 
    }
    ```

- `DELETE - /meal/:id`
    ```
    response code: 204

    ```

- `GET - /meal/:id`
    ```
    response: 
    {
        "name": string,
        "description": string,
        "date": date,
        "isDiet": boolean
    }
    ```

## /user routes

- `POST - /user`
    ```
    body: 
    {
        "name": string,
        "email": string,
    }
    response: 
    {
        "id": uuid 
    }
    ```
 
- `GET - /user/:id/meals`
    ```
    response: 
    meals: [
        {
            "name": string,
            "description": string,
            "date": date,
            "isDiet": boolean
        }
    ]
    ```

- `GET - /user/:id/summary`
    ```
    response: 
    summary: 
    {
        "qtdMeals": number,
        "qtdDietMeals": number,
        "qtdNoDietMeals": number,
        "bestDietStreak": boolean
    }
    ```