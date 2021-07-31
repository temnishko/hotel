import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Rooms} from "./rooms.model";

interface ReservationCreationAttrs {
    roomId: number;
    dateFrom: Date;
    dateTo: Date;
    fullName: string;
    phone: string;
}

@Table({tableName: 'reservation'})
export class Reservation extends Model<Reservation, ReservationCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Rooms)
    @Column({type: DataType.INTEGER})
    roomId: number;

    @Column({type: DataType.DATE, allowNull: false})
    dateFrom: Date;

    @Column({type: DataType.DATE, allowNull: false})
    dateTo: Date;

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string;

    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

}
