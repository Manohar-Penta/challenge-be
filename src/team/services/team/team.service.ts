import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from 'src/DTO/Team.dto';
import { Member, Team } from 'TypeORM/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  // service to create team with members
  async createTeam(data: CreateTeamDto) {
    const newMembers = data.members.map((member) => {
      return this.memberRepository.create({ name: member });
    });

    // check if team already exists
    const existingTeam = await this.teamRepository.findOne({
      where: { name: data.name },
    });
    if (existingTeam) {
      throw new HttpException('Team already exists!!', HttpStatus.BAD_REQUEST);
    }

    // create team
    const newTeam = this.teamRepository.create({
      name: data.name,
      members: newMembers,
    });
    return await this.teamRepository.save(newTeam);
  }
}
