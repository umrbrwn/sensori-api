import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'sensor_activity', timestamps: false })
export class SensorActivityModel extends Model {
  @Column({ primaryKey: true })
  sensor_id: number;

  @Column({ primaryKey: true })
  timestamp: number;

  @Column({ type: DataType.JSON })
  data: string;
}
