# SDK Client multi-auth bug reproduction

This repository reproduces a bug with `smithy-aws-typescript-codegen` where auth fails in the sdk client when the model has
both `@httpBearerAuth` and `@httpApiKeyAuth` (in the respective `@auth` order).

## Prerequisites

- [Smithy CLI](https://smithy.io/2.0/guides/smithy-cli/cli_installation.html)
- Node.js 20+

## Reproduce

```bash
# Install dependencies
npm install

# Generate the SDK
npm run generate

# Run the test
npm run test:auth
```

## Expected

The SDK should first try bearer token auth, then try api key auth, and only fail if neither resolve. 

## Actual

The SDK tries bearer token auth first, falls back to the nodeProvider, which throws an error. Api-key auth resolution is never attempted.
```
TokenProviderError: Could not load token from any providers
    at node_modules/@aws-sdk/token-providers/dist-cjs/index.js:151:11
    ...
    at generated-sdk/dist-cjs/runtimeConfig.js:47:28
```
