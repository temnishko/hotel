import { ApiProperty } from '@nestjs/swagger'
import {CreateRoomsDto} from "./create-rooms.dto";

export class RoomsDto extends CreateRoomsDto{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id: number

  constructor(partial: Partial<RoomsDto>) {
    super(partial)
    Object.assign(this, partial)
  }
}
