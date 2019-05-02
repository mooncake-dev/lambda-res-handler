'use strict';

/**
 * Creates a Function that can send an HTTP JSON response and a Function that can render HTML.
 *
 * @param {Object} [defaultHeaders={}] - default HTTP response headers sent with every response
 *
 * @returns {Object} Object with response helper methods.
 *
 * Usage:
 *  const sendRes = createResHandler({ 'Access-Control-Allow-Origin': '*'});
 *  sendRes.json(200, [1, 2, 3]);
 */
module.exports = function createResHandler(defaultHeaders = {}) {
  const resHandlers = {
    /**
     * @param {Number} [statusCode=200] - HTTP response status code
     * @param {Object} [body] - HTTP response body
     * @param {Object} [headers={}] - HTTP reponse headers
     *
     * @returns {Object} Lambda HTTP response
     */
    json(statusCode = 200, body, headers = {}) {
      return {
        headers: {
          ...defaultHeaders,
          ...headers
        },
        statusCode,
        body: JSON.stringify(body)
      };
    },

    /**
     * The function renders HTML by responding to the API Gateway with the HTML content in the body property.
     *
     * @param {Number} [statusCode=200] - HTTP response status code
     * @param {Object} [body] - HTTP response body
     * @param {Object} [headers={}] - HTTP reponse headers
     *
     * @returns {Object} Lambda HTTP response
     */
    html(statusCode = 200, body, headers = {}) {
      return {
        headers: {
          ...defaultHeaders,
          ...headers,
          'Content-Type': 'text/html'
        },
        statusCode,
        body
      };
    }
  };

  return resHandlers;
};
