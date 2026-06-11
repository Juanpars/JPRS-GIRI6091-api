import { Inject, Injectable } from '@nestjs/common';
import type { ITasksRepository } from '../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(ITasksRepositoryToken)
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.tasksRepository.findById(id);
    
    if (!task) {
      throw new Error(`Task not found ${id}`);
    }

    await this.tasksRepository.delete(id);
  }
}