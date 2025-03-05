import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeamController } from './controllers/team/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './services/team/team.service';
import { Member, Team } from 'src/TypeORM/entities';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TeamController);
  }
}
