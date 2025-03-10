import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignTaskDto, CreateTaskDto, UpdateTaskDto } from 'src/DTO/Task.dto';
import { Member, Task } from 'TypeORM/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  // Retrieve tasks for a specific assignee
  async getTasks(assignee: string) {
    // Find the member by name
    const member = await this.memberRepository.findOne({
      where: { name: assignee },
    });
    if (!member) {
      throw new HttpException('User not found!!', HttpStatus.BAD_REQUEST);
    }
    // Return tasks associated with the member
    return await this.taskRepository.find({ where: { member: member } });
  }

  // Create new tasks
  async createTask(data: CreateTaskDto[]) {
    for (let i = 0; i < data.length; i++) {
      // Check if the task already exists
      let newTask = await this.taskRepository.findOne({
        where: { id: data[i].id },
      });

      if (newTask) {
        throw new HttpException(
          'Task already exists!!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    // Create and save new tasks
    const newTask = data.map((task) => this.taskRepository.create(task));
    return await this.taskRepository.save(newTask);
  }

  // Assign a task to a member
  async assignTask(data: AssignTaskDto) {
    // Find the task by ID
    const task = await this.taskRepository.findOne({ where: { id: data.id } });
    if (!task) {
      throw new HttpException('Task not found!!', HttpStatus.BAD_REQUEST);
    }

    // Find the member by name
    const member = await this.memberRepository.findOne({
      where: { name: data.assignee },
    });
    if (!member) {
      throw new HttpException('Assignee not found!!', HttpStatus.BAD_REQUEST);
    }

    // Assign the task to the member and save
    task.member = member;
    return this.taskRepository.save(task);
  }

  // Update an existing task
  async updateTask(data: UpdateTaskDto) {
    // Find the task by ID
    const task = await this.taskRepository.findOne({ where: { id: data.id } });
    if (!task) {
      throw new HttpException('Task not found!!', HttpStatus.BAD_REQUEST);
    }

    // Update task properties
    Object.keys(data).forEach((key) => {
      task[key] = data[key];
    });
    // Save the updated task
    return this.taskRepository.save(task);
  }
}
