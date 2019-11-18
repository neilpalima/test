import {expect} from 'chai';
import * as sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import errorHandler from '../src/middleware/error-handler';


describe('Error handler middleware', () => {

  const middleware = errorHandler();

  it('should be able error without status', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = sinon.spy();
    const error = new Error();

    middleware(error, request, response, next);

    expect(response.statusCode).to.be.equal(500);
    expect(response._getJSONData()).to.be.deep.equal({
      message: 'An error has occurred'
    });
    expect(next.notCalled).to.be.true;
  });

  it('should be able error with status', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = sinon.spy();
    const data = {
      type: 'Generic error',
      message: 'Encountered an error',
      errors: []
    };
    const error = {
      ...data,
      name: data.type,
      status: 400,
    };

    middleware(error, request, response, next);

    expect(response.statusCode).to.be.equal(error.status);
    expect(response._getJSONData()).to.be.deep.equal(data);
    expect(next.notCalled).to.be.true;
  });

});