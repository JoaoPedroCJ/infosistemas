# Processo Seletivo Info Sistemas - Backend

## Proposta

> 1. Criar projeto backend utilizando (Node.Js)
> 2. Criar crud de veículos com os seguintes atributos (id, placa, chassi, renavam, modelo, marca, ano). Obs.: Os dados podem ser salvos em arquivos
> 3. Criar teste unitários utilizando Mocha (Node) para cada uma das operações (create, read, update, delete)
> 4. Criar recursos rest para acesso aos dados dos veículos
> 5. Criar projeto front-end utilizando a tecnologia Angular 5+ (Opcional)
> 6. Criar lista de veiculos. Obs.: os dados deverão ser recuperados dos recursos rest definidos na aplicação backend (Opcional)
> 7. Disponibilizar projeto no github

## Justificativas

  - Foi utilizado o docker para os serviços `PostreSQL` e `Redis`
  - Foi utilizado o `Jest` oa invés do `Mocha` pela melhor compatibilidade com o `TypeScript` e `TypeScript Paths`
  - Foi adicionado um sitema de usuários e apenas usuários logados tem acesso aos dados
  - Apenas usuários com perissão de admin podem acessar as rotas de `POST`, `PUT` e `DELETE`

```
user@example.com
teste123

admin@example.com
teste123
```

## Qualidade
  - O projeto foi feito utilizando os principios do `SOLID` e está todo independende e modularizado
  - Foi utilizado o ESLint e o Prettier para manter um  bom padrão de formatação do código

| Statements | Branches | Functions | Lines |
|:-:|:-:|:-:|:-:|
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-92.59%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)    |

## Pré requisitos
 - Git (https://git-scm.com/)
 - Node (https://nodejs.org)
 - Docker (https://www.docker.com/) `opcional`
 - Docker Compose (https://docs.docker.com/compose/) `opcional`
 - PostegreSQL (https://www.postgresql.org/)
 - Redis (https://redis.io/)

## Instalação

### Clonando o Repositório

```
git clone https://github.com/JoaoPedroCJ/infosistemas.git
cd infosistemas
npm install
```

### Iniciando os bancos de dados

Caso opte pelo docker

```
docker-compose up -d --build
```

Caso contrário será necessário instalar o PostgreSQL e Redis manualmente

Configure os aquivos `.env` e `ormconfig.json`

### Criando tabelas e dados iniciais

```
npm run typeorm migration:run

ou

yarn typeorm migration:run
```

### Utilização

Uma vez que o projeto esteja configurado basta utilizar o comando:

```
npm run dev

ou

yarn dev
```

caso queria usar a versão compilada do projeto:

```
npm run build
npm start

ou

yarn build
yarn start
```

## Documentação

Uma vez iniciado o servidor em ambiente de desenvolvimento (`NODE_ENV = development`);
a documentação estará disponivel no link (http://localhost:3333/api-docs)

também estão disponiveis o aquivo da documentação em [JSON](https://github.com/JoaoPedroCJ/infosistemas/blob/main/src/docs/swagger.json) e [YAML](https://github.com/JoaoPedroCJ/infosistemas/blob/main/src/docs/swagger.yaml)
