import { ApiProperty } from '@nestjs/swagger'

export class CreateReservationDto {
  @ApiProperty({example: '2021-07-31', description: 'Дата заезда'})
  dateFrom: string;

  @ApiProperty({example: '2021-08-03', description: 'Дата выезда'})
  dateTo: string

  @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО клиента'})
  fullName: string

  @ApiProperty({example: '+791234567890', description: 'Телефон клиента'})
  phone: string
}
