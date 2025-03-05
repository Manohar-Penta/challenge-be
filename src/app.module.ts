import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Task, Team } from './TypeORM/entities';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Team, Task, Member],
      synchronize: process.env.NODE_ENV === 'development', // set to false in prod
    }),
    TeamModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
