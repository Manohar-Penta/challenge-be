import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import 'dotenv/config';
import { dataSourceOptions } from '../TypeORM/dataSource';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TeamModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
