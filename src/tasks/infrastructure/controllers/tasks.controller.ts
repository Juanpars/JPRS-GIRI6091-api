import { Controller, Get, Inject } from '@nestjs/common';
import { CreateTasksUseCase } from '../../aplication/create-tasks.use.case';
import { type ITasksRepository } from '../../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../../domain/tasks.repository.interface';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskCase: CreateTasksUseCase,
    @Inject(ITasksRepositoryToken)
    private readonly taskRepository: ITasksRepository,
  ) {}

  @Get()
  async findAll() {
    return this.taskRepository.findAll();
  }
}