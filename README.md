# Getting Started

## Nodejs version

```sh
cat .nvmrc # v23.1.0
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

## References

- Typescript: <https://fastify.dev/docs/latest/Reference/TypeScript>
