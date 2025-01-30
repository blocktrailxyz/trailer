# Getting Started

![Build Status](https://github.com/blocktrailxyz/trailer/actions/workflows/build.yml/badge.svg)

## About

**Trailer** is an open-source, intelligent trading and analytics platform for cryptocurrency enthusiasts and developers. Designed to empower users with professional-grade tools and insights, **Trailer** offers:

- **Real-Time Insights**: Fetch live price feeds, on-chain data, and social sentiment for comprehensive market analysis.
- **Predictive Analytics**: Use advanced machine learning models like LSTM and Transformers to predict trends and prices.
- **Customizable Trading Bots**: Modular bots automate trades with strategies like arbitrage, trend-following, and risk management.
- **Smart Portfolio Management**: Optimize investments with tools that calculate risk-adjusted metrics and diversification strategies.
- **Blockchain Integration**: Seamlessly track on-chain activity like staking, whale movements, and token transfers.
- **Community-Driven Sentiment Analysis**: Leverage social trends and engagement to make informed decisions.

The project is licensed under the **MIT License**, allowing everyone to freely use, modify, and share it as long as proper credit is given. Think of it like lending your trailer full of tools to friends—they can build on it or take it to their next adventure!

## Requirement

Postgresql

```sql
-- postgresql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- check if the extension is enabled with sql
SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp';
SELECT * FROM pg_extensio
```

Nodejs

```sh
# nodejs 23.1
cat .nvmrc # v23.1.0

# copy the config for development
cp .env.example .env

# init the project
npm init -y

# init jest
npx ts-jest config:init

# run test
yarn test

```

## Frontend

The frontend app is in Nextjs under the /frontend directory.

## References

- Typescript: <https://fastify.dev/docs/latest/Reference/TypeScript>
- <https://www.quicknode.com/guides/solana-development/dapps/how-to-authenticate-users-with-a-solana-wallet>
- Postman: <https://documenter.getpostman.com/view/41265322/2sAYQiB87a>
- Register Google Oauth API: <https://dev.to/jkevinbaluyot/google-login-rails-7-tutorial-1ai6>
- Google one-tap login: <https://developers.google.com/identity/gsi/web/reference/html-reference> and make sure to whitelist your domains in the **Authorized JavaScript origins
** section next to the **Authorized redirect URIs** in the Credentials config.
- Register Github Oauth API: <https://github.com/settings/applications/new>
- Register Microsoft Oauth API: <https://docs.flexera.com/flexera/EN/ITAssets/M365_RegisteringAppAzure_OLH.htm>

## Dataset / Public API

- <https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1>
