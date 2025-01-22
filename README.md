# Getting Started

![Build Status](https://github.com/blocktrailxyz/trailer/actions/workflows/build.yml/badge.svg)

## Requirement

```sh
# nodejs 23.1
cat .nvmrc # v23.1.0

# postgresql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

#check if the extension is enabled.
SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp';
SELECT * FROM pg_extensio
```

## How to

```sh
# copy the config for development
cp .env.example .env

# init the project
npm init -y

# init jest
npx ts-jest config:init

# run test
yarn test

# run only a specific block
yarn test -t "should throw an EnvNotFoundError if the variable does not exist and no default value is provided"

# init sequelize in the project and the models, migrations and seeders will be created
npx sequelize-cli init

# create model and migration
npx sequelize-cli model:generate --name User --attributes name:string,displayName:string,emojicon:string

# only the migration
npx sequelize-cli migration:generate --name add-timestamp-to-user

# migrate the model
npx sequelize-cli db:migrate

```

## References

- Typescript: <https://fastify.dev/docs/latest/Reference/TypeScript>
