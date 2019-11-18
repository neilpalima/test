import {expect} from 'chai';
import * as sinon from 'sinon';

import * as controller from '../src/controllers/commentController';
import OrganizationModel from '../src/models/Organization';
import CommentModel from '../src/models/Comment';

describe('Comment Controller', () => {

  let commentModelStub: sinon.SinonStub;
  let organizationModelStub: sinon.SinonStub;

  const orgName = 'test';

  describe('Get comments', () => {

    afterEach(() => {
      commentModelStub.restore();
    });

    it('should be able to get comments', async () => {
      commentModelStub = sinon.stub(OrganizationModel, 'findOne').resolves({
        comments: [{
          content: 'Comment 1',
        }, {
          content: 'Comment 2'
        }]
      } as any);
      const result = await controller.get(orgName);

      expect(result.length).to.be.equal(2);
    });

    it('should be able to throw when organization does not exist', (done) => {
      commentModelStub = sinon.stub(OrganizationModel, 'findOne').resolves(null);

      controller.get(orgName).catch(() => done());
    });

  });

  describe('Add comment', () => {

    afterEach(() => {
      commentModelStub.restore();
      organizationModelStub.restore();
    });

    it('should be able to get comments', async () => {
      organizationModelStub = sinon.stub(OrganizationModel, 'findOne').resolves({ id: 1 } as any);
      commentModelStub = sinon.stub(CommentModel, 'create').resolves();

      await controller.add(orgName, 'New comment test');

      expect(organizationModelStub.calledOnce).to.be.true;
      expect(commentModelStub.calledOnce).to.be.true;

    });

    it('should be able to throw when organization does not exist', (done) => {
      organizationModelStub = sinon.stub(OrganizationModel, 'findOne').resolves(null);

      controller.add('', '').catch(() => done());
    });

    it('should be able to throw when comment is undefined', (done) => {
      organizationModelStub = sinon.stub(OrganizationModel, 'findOne').resolves(null);

      controller.add(undefined, '').catch(() => done());
    });

  });

  describe('Soft delete comments', () => {

    afterEach(() => {
      commentModelStub.restore();
      organizationModelStub.restore();
    });

    it('should be able to soft delete comments', async () => {
      organizationModelStub = sinon.stub(OrganizationModel, 'findOne').resolves({ id: 1 } as any);
      commentModelStub = sinon.stub(CommentModel, 'update').resolves();

      await controller.softDelete(orgName);

      expect(organizationModelStub.calledOnce).to.be.true;
      expect(commentModelStub.calledOnce).to.be.true;

    });

    it('should be able to throw when organization does not exist', (done) => {
      organizationModelStub = sinon.stub(OrganizationModel, 'findOne').resolves(null);

      controller.softDelete('').catch(() => done());
    });

  });

});