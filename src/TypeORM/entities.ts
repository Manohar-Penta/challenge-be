import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export type TaskStatus = 'done' | 'pending';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  name: string;

  @OneToMany(() => Member, (member) => member.team, { cascade: ['insert'] })
  members: Member[];
}

@Entity()
export class Member {
  @Column({ unique: true, primary: true })
  name: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @OneToMany(() => Task, (task) => task.member)
  tasks: Task[];
}

@Entity()
export class Task {
  @Column('int', { primary: true })
  id: number;

  @Column('text')
  description: string;

  @Column('date')
  due_date: Date;

  @Column({ type: 'enum', enum: ['done', 'pending'], default: 'pending' })
  status: TaskStatus;

  @ManyToOne(() => Member, (member) => member.tasks)
  member: Member;
}
