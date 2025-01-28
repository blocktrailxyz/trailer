# Getting Started

![Build Status](https://github.com/blocktrailxyz/trailer/actions/workflows/build.yml/badge.svg)

## About

**Trailer** is an open-source, intelligent trading and analytics platform for cryptocurrency enthusiasts and developers. Designed to empower users with professional-grade tools and insights, **Trailer** offers:.

The name "Trailer" symbolizes mobility, adaptability, and support—traits that define this project’s ability to empower users with a strong focus on:

- **Real-Time Insights**: Fetch live price feeds, on-chain data, and social sentiment for comprehensive market analysis.
- **Predictive Analytics**: Use advanced machine learning models like LSTM and Transformers to predict trends and prices.
- **Customizable Trading Bots**: Modular bots automate trades with strategies like arbitrage, trend-following, and risk management.
- **Smart Portfolio Management**: Optimize investments with tools that calculate risk-adjusted metrics and diversification strategies.
- **Blockchain Integration**: Seamlessly track on-chain activity like staking, whale movements, and token transfers.
- **Community-Driven Sentiment Analysis**: Leverage social trends and engagement to make informed decisions.

The project is licensed under the **MIT License**, allowing everyone to freely use, modify, and share it as long as proper credit is given. Think of it like lending your trailer full of tools to friends—they can build on it or take it to their next adventure!

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
- <https://www.quicknode.com/guides/solana-development/dapps/how-to-authenticate-users-with-a-solana-wallet>
