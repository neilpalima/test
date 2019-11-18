import * as chai from 'chai';
import httpServer from '../src/server';

chai.use(require('chai-http'));

const { expect } = chai;

describe('Server', () => {

  let server;

  const orgName = 'test';

  before(async () => {
    server = await httpServer;
  });

  afterEach(() => {});

  describe('POST /orgs/:name/comments', () => {

    it('should be able to post comment', async () => {
      const res = await chai.request(server)
        .post(`/orgs/${orgName}/comments`)
        .send({ comment: 'New comment' });

      expect(res.status).to.be.equal(200);
    });

    it('should not be able to post comment with invalid organization name', async () => {
      const res = await chai.request(server)
        .post('/orgs/----/comments')
        .send({ comment: 'New comment' });

      expect(res.status).to.be.equal(500);
    });

    it('should not be able to post comment with missing comment in payload', async () => {
      const res = await chai.request(server)
        .post('/orgs/----/comments')
        .send({ });

      expect(res.status).to.be.equal(500);
    });

  });

  describe('GET /orgs/:name/comments', () => {

    it('should be able to get data', async () => {
      const res = await chai.request(server)
        .get(`/orgs/${orgName}/comments`);

      expect(res.status).to.be.equal(200);
    });

    it('should not be able to get data with invalid organization name', async () => {
      const res = await chai.request(server)
        .get('/orgs/----/comments');

      expect(res.status).to.be.equal(500);
    });

  });

  describe('DELETE /orgs/:name/comments', () => {

    it('should be able to soft delete', async () => {
      const res = await chai.request(server)
        .del(`/orgs/${orgName}/comments`);

      expect(res.status).to.be.equal(200);
    });

    it('should not be able to soft delete with invalid organization name', async () => {
      const res = await chai.request(server)
        .del('/orgs/----/comments');

      expect(res.status).to.be.equal(500);
    });

  });

  describe('GET /orgs/:name/members', () => {

    it('should be able to get data', async () => {
      const res = await chai.request(server)
        .get(`/orgs/${orgName}/members`);

      expect(res.status).to.be.equal(200);
    });

    it('should not be able to get data with invalid organization name', async () => {
      const res = await chai.request(server)
        .get('/orgs/----/comments');

      expect(res.status).to.be.equal(500);
    });

  });
});