import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITasksRepository } from '../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';
import { Task } from '../domain/tasks.entity';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(
    @Inject(ITasksRepositoryToken)
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<Task> {
    const task = await this.tasksRepository.findById(id);
    
    if (!task) {
      throw new NotFoundException(`Task not found ${id}`);
    }
    
    return task;
  }
}