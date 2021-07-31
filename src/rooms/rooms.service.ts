import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Rooms} from "./model/rooms.model";
import {CreateRoomsDto} from "./dto/create-rooms.dto";
import {filterRoomsDto} from "./dto/filter-rooms.dto";
import {Reservation} from "./model/reservation.model";
import {Op} from "sequelize"
import {ReservationService} from "./reservation.service";
import {RoomsDto} from "./dto/rooms.dto";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Rooms) private roomsRepository: typeof Rooms,
        private readonly reservationService: ReservationService,
    ) {}

    create(dto: CreateRoomsDto) {
        return this.roomsRepository.create(dto);
    }

    async find(query: filterRoomsDto) {
        const {dateFrom, dateTo} = this.reservationService.getDate(query)
        const rooms = await this.roomsRepository.findAll({
            where: {
                [Op.or]: [
                    {[Op.and]: [
                        { '$reservations.dateFrom$': { [Op.notBetween]: [dateFrom, new Date(query.dateTo)] }},
                        { '$reservations.dateTo$': { [Op.notBetween]: [dateFrom, dateTo] }},
                    ]},
                    {'$reservations.roomId$': {[Op.is]: null}}
                ]
            },
            include: [{
                model: Reservation,
                required: false,
            }]
        });
        return rooms.map(room => {
            return new RoomsDto({
                id: room.id,
                number: room.number,
                description: room.description,
            })
        });
    }
}
