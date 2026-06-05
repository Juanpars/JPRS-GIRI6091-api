import { Injectable, Inject } from '@nestjs/common';
import { type ITasksRepository } from '../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';
import { Task } from '../domain/tasks.entity';

@Injectable()
export class CreateTasksUseCase {
  constructor(
    @Inject(ITasksRepositoryToken)
    private readonly tasksRepository: ITasksRepository,
  ) {}

  async execute(title: string, description: string): Promise<Task> {
    const crypto = await import('crypto');
    const task = new Task(crypto.randomUUID(), title, description, 'pending', new Date());

    return this.tasksRepository.create(task);
  }
}