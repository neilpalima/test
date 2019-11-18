import {Column, DataType, Model, PrimaryKey, AutoIncrement, ForeignKey, Table, BelongsTo} from 'sequelize-typescript';

import OrganizationModel from './Organization';
import User from './User';

@Table({
  tableName: 'organization_member',
  timestamps: false
})
class OrganizationMember extends Model<OrganizationMember> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => OrganizationModel)
  @Column(DataType.INTEGER)
  public organization_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_id: number;

  @BelongsTo(() => OrganizationModel)
  public organization: OrganizationModel;

  @BelongsTo(() => User)
  public user: User;
}

export default OrganizationMember;