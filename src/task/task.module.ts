import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskController } from './controllers/task/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './services/task/task.service';
import { Member, Task } from 'src/TypeORM/entities';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Member])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TaskController);
  }
}
