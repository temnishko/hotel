import { ApiProperty } from '@nestjs/swagger'
import {CreateReservationDto} from "./create-reservation.dto";

export class ReservationDto extends CreateReservationDto{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id: number
}
