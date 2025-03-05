import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  members: string[];
}
