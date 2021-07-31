import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Reservation} from "./model/reservation.model";
import {CreateReservationDto} from "./dto/create-reservation.dto";
import {Op} from "sequelize"

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation) private reservationRepository: typeof Reservation) {}

    async create(roomId: number, dto: CreateReservationDto) {
        if(dto.dateFrom > dto.dateTo || dto.dateFrom === dto.dateTo)
            throw new BadRequestException('Дата выезда не может быть меньше и равной дате заезда')
        const {dateFrom, dateTo} = this.getDate(dto)

        const bookedRoom = await this.reservationRepository.findOne({
            where: {
                roomId,
                [Op.or]: [
                    { dateFrom: { [Op.between]: [dateFrom, dateTo] }},
                    { dateTo: { [Op.between]: [dateFrom, dateTo] }},
                ]
            }
        })
        if(bookedRoom) throw new BadRequestException('Номер забронирован на выбранные даты')
        else return this.reservationRepository.create({...dto, roomId, dateFrom, dateTo});
    }

    getDate(dto) {
        const dateFrom = new Date(dto.dateFrom)
        if(isNaN(dateFrom.getTime()))
            throw new BadRequestException('Передана некорректная дата')
        dateFrom.setHours(14)
        const dateTo = new Date(dto.dateTo)
        if(isNaN(dateTo.getTime()))
            throw new BadRequestException('Передана некорректная дата')
        dateTo.setHours(12)
        return {dateFrom, dateTo}
    }
}
