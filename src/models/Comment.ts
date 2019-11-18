import {Column, DataType, Default, Model, PrimaryKey, AutoIncrement, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';

import OrganizationModel from './Organization';

@Table({
  tableName: 'comment',
  timestamps: false
})
class Comment extends Model<Comment> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public content: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public soft_deleted: boolean;

  @Column(DataType.INTEGER)
  @ForeignKey(() => OrganizationModel)
  public organization_id: number;

  @BelongsTo(() => OrganizationModel)
  organization: OrganizationModel;
}

export default Comment;