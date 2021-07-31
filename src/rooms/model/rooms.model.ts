import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Reservation} from "./reservation.model";

interface RoomsCreationAttrs {
    number: string;
    description: string;
}
@Table({tableName: 'rooms'})
export class Rooms extends Model<Rooms, RoomsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    number: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @HasMany(() => Reservation)
    reservations: Reservation[];
}
