### GYM Point Mobile

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16.3](https://nodejs.org/)
- Yarn [Yarn v1.19.1](https://yarnpkg.com/)
- Postgres [PostgreSQL](https://www.postgresql.org/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções

```bash
# clonar o repositório
git clone https://github.com/mateus0h/gympoint/backend-gympoint.git

# entrar na pasta do projeto
cd backend-gympoint

# instalar as dependências
yarn install

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# start services (postgres, redis)
docker start postgres
docker start redis

# criar DB Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar a fila de jobs
yarn queue

# iniciar o servidor da aplicação
yarn dev
```