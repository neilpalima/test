import * as sequelize from 'sequelize';

import Organization from '../models/Organization';
import Comment from '../models/Comment';

export const get = async (orgName: string) => {
  const data = await Organization.findOne({
    where: { name: orgName },
    include: [{
      model: Comment,
      where: { soft_deleted: { [sequelize.Op.not]: true } },
      attributes: ['content']
    }],
  });

  if (!data) throw new Error('Organization not found');

  return data.comments.map(({ content }) => content);
};

export const add = async (orgName: string, comment: string) => {
  if (!comment) throw new Error('Missing comment in payload');

  const org = await Organization.findOne({where: { name: orgName }});

  if (!org) throw new Error('Organization not found');

  await Comment.create({
    content: comment,
    organization_id: org.id
  });
};

export const softDelete = async (orgName: string) => {
  const org = await Organization.findOne({where: { name: orgName }});

  if (!org) throw new Error('Organization not found');

  await Comment.update({ soft_deleted: true }, {
    where: {
      organization_id: org.id
    }
  });
};