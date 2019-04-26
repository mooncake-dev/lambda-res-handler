# Lambda res handler

AWS Lambda APIG proxy integration helper to send an HTTP response.

- [Installation](#installation)
- [API](#api)
- [Usage](#usage)
- [Examples](#examples)
- [Publish](#publish)

## Installation

```
npm i @mooncake-dev/lambda-res-handler
```

## API

The module exposes a function `createResHandler` that returns an `resHandlers` Object with helper methods to send HTTP responses. It can be configured with default headers, that will be sent every time the response handler helper is called.

### createResHandler(defaultHeaders)

**Parameters:**

| Name           | Required | Type   | Description                                  |
| -------------- | -------- | ------ | -------------------------------------------- |
| defaultHeaders | No       | Object | Contains default headers as key-value pairs. |

**Returns:**

Object `resHandlers`.

This Object contains the following methods:

| Name | Description                           |
| ---- | ------------------------------------- |
| json | Stringifies response payload as JSON. |

#### resHandlers.json(code, body, headers)

**Parameters:**

| Name    | Required | Type            | Description                                                                   |
| ------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| code    | No       | Number          | A valid HTTP status code, which defaults to `200`.                            |
| body    | No       | Object or Array | The payload to be returned as JSON.                                           |
| headers | No       | Object          | Any headers to send (in addition to the `defaultHeaders`) as key-value pairs. |

**Returns:**

Object.

This is an AWS Lambda conformant HTTP response Object:

```
{
  headers: {},
  statusCode: 200,
  body: {}
}
```

## Usage

```js
const createResHandler = require('@mooncake-dev/lambda-res-handler');
const sendRes = createResHandler();
sendRes.json(201, { hello: 'world' });
```

## Examples

```js
'use strict';

const createResHandler = require('@mooncake-dev/lambda-res-handler');

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*'
};

const sendRes = createResHandler(defaultHeaders);

/**
 * Lambda APIG proxy integration.
 *
 * @param {Object} event - HTTP input
 *
 * @return {Object} HTTP output
 */
module.exports.sendData = async event => {
  try {
    const data = [1, 2, 3];
    return sendRes.json(200, data);
  } catch (err) {
    console.log('error: ', err); // eslint-disable-line no-console

    const statusCode = err.statusCode || 500;
    const data = {
      error: err.message,
      details: err.details
    };

    return sendRes.json(statusCode, data, { 'extra-header': 'kaput' });
  }
};
```

## Publish

For now we publish manually using:

```
npm publish --access public
```

Make sure:

- You increment the npm version after you make code changes with `npm version`.
- You're logged in.

More information can be found [here](https://docs.npmjs.com/creating-and-publishing-an-org-scoped-package).
