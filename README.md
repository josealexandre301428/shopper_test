# Sistema de Validação e Atualização de Preços

Este é um projeto que visa criar um sistema com capacidade de validação e atualização de preços de produtos, conforme os requisitos definidos. Abaixo estão as instruções para instalação e execução local do sistema.


## Requisitos do Sistema

 - Back end: `Node.js`
 - Front end: `React.js`
 - Linguagem de Programação: `JavaScript` ou `TypeScript`
 - Banco de Dados: `MySQL - (versão 5 ou 8)`

## Instruções de Instalação e Exedecução Local

### Pré-requisitos

 - Node.js instalado (v14.x ou superior)
 - MySQL instalado (versão 5 ou 8)
 - Git instalado (opcional, apenas para clonar o repositório)

### Passos do Setup:

 1 - Clone o repositório:

   - Use o comando: `git clone git@github.com:josealexandre301428/shopper_test.git`
   - Entre na pasta do repositório que você acabou de clonar:
    - `cd shopper_test`

2 - Instale as dependências: 
    - Para isso, use o seguinte comando na raiz do projeto:

      - `npm install`: Instala dependecias na raiz do projeto
      - `npm run dev:prestart`: Instala dependecias Front, Back e Popula banco de dados
      - `npm run dev` : Este comando ira iniciar o Backend e Frontend 

## Banco de dados e Sequelize

Para o banco de dados, utilizaremos o ORM Sequelize, que fará interface com o MySQL8.

## Scripts relevantes do package.json

São os scripts da raiz do projeto (./package.json) e não das aplicações individuais ./front-end/package.json e ./back-end/package.json:
- `stop`: Para e deleta as aplicações rodando no `pm2`;

    - uso (na raiz do projeto): `npm stop`
- `dev`: Limpa as portas 3000 e 3001 e sobe a aplicação com pm2 em modo fork (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo watch);

    - uso (na raiz do projeto): `npm run dev`
- `dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (npm i) nos dois projetos (./front-end e ./back-end) e roda o Sequelize no ./back-end (lembrar de configurar o .env no mesmo);

    - uso (na raiz do projeto): `npm run dev:prestart`
- `db:reset`: Roda os scripts do Sequelize restaurando o banco de dados de desenvolvimento (final -dev). Utilize esse script caso ocorra algum problema no seu banco local;

    - uso (na raiz do projeto): `npm run db:reset`
# Funcionalidades do Sistema
    -Stack utilizada:
        - **Front-end:** React, tAILWIND, axios.
        - **Back-end:** Node, Express, cors, Sequelize, MySql8.


 - Carregar arquivo de precificação.
 - Validar arquivo através do botão "VALIDAR".
 - Exibir informações dos produtos após a validação.
 - Exibir quais regras foram quebradas, caso existam.
 - Atualizar os preços no banco de dados através do botão "ATUALIZAR".
 - Atualizar o preço de custo dos pacotes como a soma dos custos dos seus componentes.
 
 
# Entrega do Projeto


 - O projeto deve estar versionado em um repositório público no GitHub.
 - Enviar o link do repositório para o e-mail talentos@shopper.com.br até as 23h59 do dia 22/04/2024.
 - O projeto deve conter um arquivo README.md com todas as instruções para instalação e execução local.


 ## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de jasspfilho@gmail.com
