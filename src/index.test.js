'use strict';

const createResHandler = require('./');

const CUSTOM_HEADER = 'x-custom-test';
const CUSTOM_HEADER_VALUE = true;
const CUSTOM_STATUS_CODE = 201;
const CUSTOM_BODY = { hello: 'world' };
const CUSTOM_HTML_BODY = '<div>Hello world!</div>';

describe('createResHandler(?defaultHeaders)', () => {
  test('creates handler', () => {
    const sendRes = createResHandler();

    expect(typeof sendRes).toBe('object');
    expect(typeof sendRes.json).toBe('function');
    expect(typeof sendRes.html).toBe('function');
  });

  describe('sendRes.json(?statusCode, ?body, ?headers)', () => {
    test('returns response Object', () => {
      const sendRes = createResHandler();
      const res = sendRes.json();

      expect(res).toHaveProperty('headers');
      expect(res).toHaveProperty('statusCode');
      expect(res).toHaveProperty('body');
    });

    test('sends custom headers', () => {
      const sendRes = createResHandler({
        [CUSTOM_HEADER]: CUSTOM_HEADER_VALUE
      });
      const res = sendRes.json();

      expect(res.headers[CUSTOM_HEADER]).toEqual(CUSTOM_HEADER_VALUE);
    });

    test('sends default status code 200', () => {
      const sendRes = createResHandler();
      const res = sendRes.json();

      expect(res.statusCode).toEqual(200);
    });

    test('sends custom status code', () => {
      const sendRes = createResHandler();
      const res = sendRes.json(CUSTOM_STATUS_CODE);

      expect(res.statusCode).toEqual(CUSTOM_STATUS_CODE);
    });

    test('sends custom body as JSON', () => {
      const sendRes = createResHandler();
      const res = sendRes.json(undefined, CUSTOM_BODY);

      expect(res.body).toEqual(JSON.stringify(CUSTOM_BODY));
    });
  });

  describe('sendRes.html(?statusCode, ?body, ?headers)', () => {
    test('returns response Object with Content-Type text/html', () => {
      const sendRes = createResHandler();
      const res = sendRes.html();

      expect(res).toHaveProperty('headers');
      expect(res).toHaveProperty('statusCode');
      expect(res).toHaveProperty('body');
      expect(res.headers).toHaveProperty('Content-Type');
      expect(res.headers['Content-Type']).toEqual('text/html');
    });

    test('sends custom headers', () => {
      const sendRes = createResHandler({
        [CUSTOM_HEADER]: CUSTOM_HEADER_VALUE
      });
      const res = sendRes.html();

      expect(res.headers[CUSTOM_HEADER]).toEqual(CUSTOM_HEADER_VALUE);
    });

    test('sends default status code 200', () => {
      const sendRes = createResHandler();
      const res = sendRes.html();

      expect(res.statusCode).toEqual(200);
    });

    test('sends custom status code', () => {
      const sendRes = createResHandler();
      const res = sendRes.html(CUSTOM_STATUS_CODE);

      expect(res.statusCode).toEqual(CUSTOM_STATUS_CODE);
    });

    test('sends custom body as HTML', () => {
      const sendRes = createResHandler();
      const res = sendRes.html(undefined, CUSTOM_HTML_BODY);

      expect(res.body).toEqual(CUSTOM_HTML_BODY);
    });
  });
});
