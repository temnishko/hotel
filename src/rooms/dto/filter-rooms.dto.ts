import { ApiProperty } from '@nestjs/swagger'

export class filterRoomsDto {
  @ApiProperty({example: '2021-07-31', description: 'Дата заезда', required: true})
  dateFrom: string

  @ApiProperty({example: '2021-08-03', description: 'Дата выезда', required: true})
  dateTo: string
}
