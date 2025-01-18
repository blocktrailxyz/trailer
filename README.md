# Getting Started

![Build Status](https://github.com/blocktrailxyz/trailer/actions/workflows/build.yml/badge.svg)

## Requirement

```sh
cat .nvmrc # v23.1.0
```

## Run the app

```sh
# copy the config for development
cp .env.example .env

# run test
yarn test

# start the dev server
yarn dev
```

## How to

```sh
npm init -y
```

init jest

```sh
npx ts-jest config:init
```

To run the test

```sh
# run the test suite
yarn test

# run only specific block
yarn test -t "should throw an EnvNotFoundError if the variable does not exist and no default value is provided"

```

## Generate Model with migration

```sh
# create model and migration
npx sequelize-cli model:generate --name User --attributes name:string,displayName:string,emojicon:string

# only the migration
npx sequelize-cli migration:generate --name add-timestamp-to-user


# migrate the model
npx sequelize-cli db:migrate

```

## Useful commands

```sh
npx sequelize-cli init

# Created "config/config.json"
# Successfully created models folder at "trailer/models".
# Successfully created migrations folder at "trailer/migrations".
# Successfully created seeders folder at "trailer/seeders".
```

## References

- Typescript: <https://fastify.dev/docs/latest/Reference/TypeScript>
