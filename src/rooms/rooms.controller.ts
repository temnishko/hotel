import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {IsAdminGuard} from "../is-admin.guard";
import {RoomsDto} from "./dto/rooms.dto";
import {Rooms} from "./model/rooms.model";
import {CreateRoomsDto} from "./dto/create-rooms.dto";
import {filterRoomsDto} from "./dto/filter-rooms.dto";
import {ReservationService} from "./reservation.service";
import {Reservation} from "./model/reservation.model";
import {CreateReservationDto} from "./dto/create-reservation.dto";
import {ReservationDto} from "./dto/reservation.dto";

@Controller('api/rooms')
export class RoomsController {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly reservationService: ReservationService,
    ) {}

    @ApiBearerAuth()
    @UseGuards(IsAdminGuard)
    @Post()
    @ApiOperation({
        summary: 'Создание номера (для админа)',
        tags: ['rooms'],
    })
    @ApiResponse({ status: 200, type: RoomsDto })
    async create(@Body() data: CreateRoomsDto): Promise<Rooms> {
        return this.roomsService.create(data)
    }

    @Get('free')
    @ApiOperation({
        summary: 'Доступные номера на выбранные даты',
        tags: ['rooms'],
    })
    @ApiResponse({ status: 200, type: RoomsDto, isArray: true })
    async add(@Query() query: filterRoomsDto): Promise<RoomsDto[]> {
        return this.roomsService.find(query)
    }

    @Post(':id/reservation')
    @ApiOperation({
        summary: 'Бронирование номера',
        tags: ['rooms'],
    })
    @ApiResponse({ status: 200, type: ReservationDto, isArray: true })
    async reservation(
        @Param('id') id: number,
        @Body() body: CreateReservationDto
    ): Promise<Reservation> {
        return this.reservationService.create(id, body)
    }
}
