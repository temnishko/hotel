import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { RoomsModule } from './rooms/rooms.module';
import {Reservation} from "./rooms/model/reservation.model";
import {Rooms} from "./rooms/model/rooms.model";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Rooms,
        Reservation,
      ],
      autoLoadModels: true
    }),
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
