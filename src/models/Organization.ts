import {Column, DataType, Model, PrimaryKey, AutoIncrement, Table, HasMany} from 'sequelize-typescript';

import Comment from './Comment';
import OrganizationMember from './OrganizationMember';

@Table({
  tableName: 'organization',
  timestamps: false
})
class OrganizationModel extends Model<OrganizationModel> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => Comment)
  public comments: Comment[]

  @HasMany(() => OrganizationMember)
  public members: OrganizationMember[];
}

export default OrganizationModel;