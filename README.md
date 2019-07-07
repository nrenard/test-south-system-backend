Demonstração do exercício [aqui](https://api-nrenard.herokuapp.com).

# Instalação

Requisitos para rodar o projeto nodeJS >= 8. Clonar repositório, entrar na pasta e instalar suas dependências com o comando `yarn` ou `npm install`.

## Para rodar o server

```
yarn start
```

## Autenticação

Temos dois usuários já cadastrados no banco.

email: `manager@southsystem.com` password: `123456`  
email: `collaborator@southsystem.com` password: `123456`

## Para rodar os testes

```
yarn test
```

## Para verificar a cobertura de testes

```
yarn coverage
```

## Micro documentação

#### Autenticação service

```
/session - método `post` para gerar um token.
```

#### Produtos service

```
/products - método `get` para listar os produtos.
/products - método `post` para cadastrar um produto.
/products/:id - método `get` para ver um produtos.
/products/:id - método `delete` para deletar um produtos.
/products/:id - método `put` para editer um produtos.
```

#### Funcionários service

```
/officials - método `get` para listar os funcionários.
/officials - método `post` para cadastrar um funcionário.
```
