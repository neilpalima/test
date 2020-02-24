import {Column, DataType, Model, PrimaryKey, AutoIncrement, Table, HasMany} from 'sequelize-typescript';

import Follower from './Follower';

@Table({
  tableName: 'user',
  timestamps: false
})
class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public name: string;

  @Column(DataType.STRING)
  public email: string;

  @Column(DataType.STRING)
  public avatar: boolean;

  @HasMany(() => Follower, 'following_user_id')
  public followers: Follower[];

  @HasMany(() => Follower, 'follower_user_id')
  public following: Follower[];
}

export default User;
