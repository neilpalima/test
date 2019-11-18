import {Sequelize} from 'sequelize-typescript';

import OrganizationModel from './Organization';
import Comment from './Comment';
import User from './User';
import Follower from './Follower';
import OrganizationMember from './OrganizationMember';

let sequelize: Sequelize;

export const connect = async () => {
  if (sequelize) {
    return sequelize;
  }

  const {
    APP_DEBUG,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASE,
  } = process.env;

  const appDebug = APP_DEBUG === 'true';

  sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: 'postgres',
    logging: appDebug && console.log,
    benchmark: appDebug,
  });

  // Add models.
  sequelize.addModels([OrganizationModel, Comment, OrganizationMember, User, Follower]);

  await sequelize.authenticate();

  /* istanbul ignore next */
  if (appDebug) {
    console.log('Successfully connected to the database!');
  }

  return sequelize;
};

export const getSequelize = () => sequelize;