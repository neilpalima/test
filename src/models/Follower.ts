import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';


@Table({
  tableName: 'follower',
  timestamps: false
})
class Follower extends Model<Follower> {

  @PrimaryKey
  @Column(DataType.INTEGER)
  public follower_user_id: number;

  @PrimaryKey
  @Column(DataType.INTEGER)
  public following_user_id: number;
}

export default Follower;