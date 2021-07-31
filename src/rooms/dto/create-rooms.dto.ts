import { ApiProperty } from '@nestjs/swagger'

export class CreateRoomsDto {
  @ApiProperty({example: '1A', description: 'Номер комнаты'})
  number: string

  @ApiProperty({example: 'Просторный номер с 2-спальной кроватью и ванной комнатой', description: 'Описание номера'})
  description: string

  constructor(partial: Partial<CreateRoomsDto>) {
    Object.assign(this, partial)
  }
}
