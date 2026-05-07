*** Configuracoes ***

npm init -y | Utilizado para inicializar o projeto node.js
npm install koa koa-router koa-bodyparser jsonwebtoken bcrypt mysql2 dotenv | Instalar Koa, Koa-router, koa-bodyparser, jsonwebtoken, bcrypt, mysql2 e dotenv
npm install -D typescript ts-node-dev @types/node @types/koa @types/koa-router @types/jsonwebtoken @types/bcrypt | Instalar dependencias para desenvolvimento
npx tsc --init | cria o arquivo de configuracao do typeScript 'tsconfig.json'
npm install -D @types/koa-bodyparser | instalando as dependencias de desenvolvimento do koa-bodyparser
npm install knex objection mysql2 | Instalando o ORM Objection para fazer interacoes com a base de dados

deixar o arquivo tsconfig.json da seguinte forma:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}

No arquivo package.json:

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts" <--------- IMPORTANTE PARA EXECUTAR O PROJETO LOCAL COM O COMANDO npm run dev
} 


