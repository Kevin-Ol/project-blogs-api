# Projeto Blogs API

Projeto feito como critério avaliativo na escola de programação **Trybe**.

O projeto é uma API criada utilizando Node.JS juntamente com o pacote Express.JS para a criação das rotas, a biblioteca Joi para validação dos dados enviados,
e a ORM Sequelize para comunicação com o banco de dados MySQL. Trata-se de uma API de blogs, capaz de criar e autenticar um usuário. Com o usuário autenticado, é
permitido a ele criar categorias de posts, e em seguida criar posts relacionados às categorias cadastradas. Além de criar, também é possivel listar, editar ou
excluir posts, bem como excluir a própria conta. Todos os dados são armazenados no banco de dados MySQL.

Neste projeto aprendi como criar uma API RESTful em arquitetura MSC, uso de tokens JWT, e utilizar a ORM Sequelize para alterar o banco de dados.

## Instruções para reproduzir o projeto

#### Pré Requisitos

Possuir o banco de dados MySQL instalado

---

1. Clone o repositório
  * `git clone git@github.com:Kevin-Ol/project-blogs-api.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-blogs-api`

2. Instale as dependências
  * `npm install`

3. Crie, na raíz do projeto, um arquivo `.env` contendo as seguintes variáveis:
```
  HOSTNAME=seu-host-mysql
  MYSQL_USER=seu-usuario-mysql
  MYSQL_PASSWORD=sua-senha-mysql
  JWT_SECRET=qualquer-string-aleatoria
  PORT=porta-para-iniciar-aplicação(padrão = 3000)
```
4. Inicie o servidor local `MySQL`

5. Inicie o projeto
  * `npm start`

6. Acesse as rotas através de softwares como Postman e Insomnia através do endereço:
  * `http://localhost:3000`
---

## Rotas

### Endpoint POST `/user`

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

- `displayName` deve ser uma string com pelo menos 8 caracteres;

- `email` deve ser uma string no formato `email@email.com` e único;

- `password` deve ser uma string com 6 caracteres;

- `image` deve ser uma string;

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"displayName\" is required"
}
```

- Caso o email já esteja em uso a requisição será respondida com o `status 409` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "User already registered"
}
```

- Caso haja sucesso na validação a requisição será respondida com o `status 201` com o token de autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```

### Endpoint POST `/login`

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "email": "email@mail.com",
  "password": "123456"
}
```

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"email\" is required"
}
```

- Caso haja falha no login a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Invalid fields"
}
```

- Caso haja sucesso na validação a requisição será respondida com o `status 200` com o token de autenticação:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}
```

### Endpoint GET `/user`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
]
```

### Endpoint GET `/user/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o usuário não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "User does not exist"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
{
  "id": "401465483996",
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

### Endpoint POST `/categories`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O corpo da requisição deve ter o seguinte formato:

```json
 {
   "name": "Inovação"
 }
```

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"name\" is required"
}
```

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 201` com o seguinte corpo:

```json
 {
   "id": 3,
   "name": "Inovação"
 }
```

### Endpoint GET `/categories`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

### Endpoint POST `/post`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

- `categoryIds` deve ser um array contendo os ids de categorias cadastradas;

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"title\" is required"
}
```

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso alguma das categorias seja inválida a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "\"categoryIds\" not found"
}
```

- Caso o token seja válido a requisição será respondida com o `status 201` com o seguinte corpo:

```json
{
  "id": 4,
  "userId": 1,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

### Endpoint GET `/post`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### Endpoint GET `/post/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o post não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Post does not exist"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

### Endpoint PUT `/post/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O post só pode ser alterado pelo seu autor

- As categorias do post não podem ser alteradas

- O corpo da requisição deve ter o seguinte formato:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
}
```

- Caso haja falha na validação a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "title is required"
}
```

- Caso seja enviado um array categoryIds a requisição será respondida com o `status 400` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Categories cannot be edited"
}
```

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o post não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Post does not exist"
}
```

- Caso o usuário não seja o autor do post a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Unauthorized user"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com o seguinte corpo:

```json
{
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

### Endpoint DELETE `/post/:id`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- O post só pode ser deletado pelo seu autor

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o post não exista a requisição será respondida com o `status 404` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Post does not exist"
}
```

- Caso o usuário não seja o autor do post a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Unauthorized user"
}
```

- Caso o token seja válido o post será deletado e a requisição será respondida com o `status 204` e sem corpo

### Endpoint DELETE `/user/me`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido o usuário será deletado e a requisição será respondida com o `status 204` e sem corpo

### Endpoint GET `/post/search?q=:searchTerm`

- A rota deve ser autenticada enviando o token como header `authorization` da requisição, que é obtido na rota de login ou de cadastro

- Caso o token não seja enviado a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Token not found"
}
```

- Caso o token não seja válido a requisição será respondida com o `status 401` e uma mensagem de erro como o exemplo abaixo:

```json
{
  "message": "Expired or invalid token"
}
```

- Caso o token seja válido a requisição será respondida com o `status 200` com os posts correspondentes ao termo buscado com o seguinte corpo:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

- Caso não haja posts correspondentes a requisição será respondida com o `status 200` com o seguinte corpo:

```json
[]
```
