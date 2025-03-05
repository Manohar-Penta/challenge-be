import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateTeamDto } from 'src/DTO/Team.dto';
import { TeamService } from 'src/team/services/team/team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  // route to create team
  @Post('create')
  async createTeam(@Body() body: CreateTeamDto) {
    return await this.teamService.createTeam(body);
  }
}
