import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignTaskDto, CreateTaskDto, UpdateTaskDto } from 'src/DTO/Task.dto';
import { TaskService } from 'src/task/services/task/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // route to get all the tasks of a assignee
  @Get(':assignee')
  async getTasks(@Param('assignee') assignee: string) {
    return await this.taskService.getTasks(assignee);
  }

  // create task route with a array of tasks
  @Post('create')
  async createTask(
    @Body(
      new ParseArrayPipe({
        items: CreateTaskDto,
        whitelist: true,
      }),
    )
    body: CreateTaskDto[],
  ) {
    return await this.taskService.createTask(body);
  }

  // assign a task to assignee route
  @Post('assign')
  async assignTask(@Body() body: AssignTaskDto) {
    return await this.taskService.assignTask(body);
  }

  // update task route
  @Patch('update')
  async updateTask(@Body() body: UpdateTaskDto) {
    return await this.taskService.updateTask(body);
  }
}
