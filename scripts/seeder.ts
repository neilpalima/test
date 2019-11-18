import * as dotenv from 'dotenv' ;
import faker = require('faker');

import * as database from '../src/models';
import Organization from '../src/models/Organization';
import OrganizationMember from '../src/models/OrganizationMember';
import User from '../src/models/User';
import Follower from '../src/models/Follower';
import Comment from '../src/models/Comment';

dotenv.config();

(async () => {

  const sequelize = await database.connect();

  await sequelize.sync({ force: true });

  const users = [];
  const organization = [{ name: 'test' }];
  for (let i = 0; i < 3; ++i) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar()
    });
    organization.push({ name: faker.company.companyName() });
  }

  const followers = [
    {follower_user_id: 1, following_user_id: 2},
    {follower_user_id: 1, following_user_id: 3},
    {follower_user_id: 2, following_user_id: 3}
  ];
  const organizationMembers = [
    {organization_id: 1, user_id: 1},
    {organization_id: 1, user_id: 2},
    {organization_id: 2, user_id: 3}
  ];
  const comments = [{content: 'test comment', organization_id: 1}];

  // Create data
  await User.bulkCreate(users);
  await Organization.bulkCreate(organization);
  await Follower.bulkCreate(followers);
  await OrganizationMember.bulkCreate(organizationMembers);
  await Comment.bulkCreate(comments);

  await sequelize.close();
})();