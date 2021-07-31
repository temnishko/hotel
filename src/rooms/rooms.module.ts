import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Rooms} from "./model/rooms.model";
import {ReservationService} from "./reservation.service";
import {Reservation} from "./model/reservation.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Rooms, Reservation]),
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    ReservationService
  ]
})
export class RoomsModule {}
