import OrganizationMember from '../models/OrganizationMember';
import User from '../models/User';
import OrganizationModel from '../models/Organization';
import Follower from '../models/Follower';

export const get = async (orgName: string) => {

  const organization = await OrganizationModel.findOne({
    where: { name: orgName },
    include: [{
      model: OrganizationMember,
      include: [{
        model: User,
        include: [{
          model: Follower,
          as: 'followers',
          attributes: ['follower_user_id'],
        }, {
          model: Follower,
          as: 'following',
          attributes: ['follower_user_id'],
        }],
      }],
    }],
  });

  if (!organization) throw new Error('Organization not found');

  const { members } = organization;

  return members.map((item, index) => ({
    user_id: members[index].user_id,
    user: {
      name: item.user.name,
      email: item.user.email,
      avatar: item.user.avatar,
      followers_count: item.user.followers.length,
      following_count: item.user.following.length
    }
  })).sort((a, b) => {
    if (a.user.followers_count === b.user.followers_count) return 0;
    return a.user.followers_count < b.user.followers_count ? 1 : -1;
  });
};