import {expect} from 'chai';
import * as sinon from 'sinon';
import faker = require('faker');

import * as controller from '../src/controllers/organizationMemberController';
import models from '../src/models/Organization';

describe('Organization Member Controller', () => {

  let modelStub: sinon.SinonStub;

  const orgName = 'test';

  describe('Get members', () => {

    afterEach(() => {
      modelStub.restore();
    });

    it('should be able to get members', async () => {
      const members = [{
        user_id: 1,
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          avatar: faker.internet.avatar(),
          followers: [],
          following: [],
        }
      }, {
        user_id: 2,
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          avatar: faker.internet.avatar(),
          followers: [,,],
          following: [,],
        }
      }, {
        user_id: 3,
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          avatar: faker.internet.avatar(),
          followers: [,,,,,,],
          following: [,,],
        }
      }, {
        user_id: 4,
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          avatar: faker.internet.avatar(),
          followers: [,,,],
          following: [,,,],
        }
      }, {
        user_id: 5,
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          avatar: faker.internet.avatar(),
          followers: [],
          following: [],
        }
      }];
      modelStub = sinon.stub(models, 'findOne').resolves({ members } as any);
      const result = await controller.get(orgName);

      expect(result).to.be.deep.equal([{
        ...members[2],
        user: {
          name: members[2].user.name,
          email: members[2].user.email,
          avatar: members[2].user.avatar,
          followers_count: members[2].user.followers.length,
          following_count: members[2].user.following.length
        }
      }, {
        ...members[3],
        user: {
          name: members[3].user.name,
          email: members[3].user.email,
          avatar: members[3].user.avatar,
          followers_count: members[3].user.followers.length,
          following_count: members[3].user.following.length
        }
      }, {
        ...members[1],
        user: {
          name: members[1].user.name,
          email: members[1].user.email,
          avatar: members[1].user.avatar,
          followers_count: members[1].user.followers.length,
          following_count: members[1].user.following.length
        }
      }, {
        ...members[0],
        user: {
          name: members[0].user.name,
          email: members[0].user.email,
          avatar: members[0].user.avatar,
          followers_count: members[0].user.followers.length,
          following_count: members[0].user.following.length
        }
      }, {
        ...members[4],
        user: {
          name: members[4].user.name,
          email: members[4].user.email,
          avatar: members[4].user.avatar,
          followers_count: members[4].user.followers.length,
          following_count: members[4].user.following.length
        }
      }]);
    });

    it('should be able to throw when organization does not exist', (done) => {
      modelStub = sinon.stub(models, 'findOne').resolves(null);

      controller.get('').catch(() => done());
    });

  });

});