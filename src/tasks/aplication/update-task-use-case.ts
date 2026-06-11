import { Inject, Injectable } from '@nestjs/common';
import type { ITasksRepository } from '../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';
import { Task } from '../domain/tasks.entity';
import { GetTaskByIdUseCase } from './get-task-by-id-use-case';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(ITasksRepositoryToken)
    private readonly tasksRepository: ITasksRepository,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
  ) {}

  async execute(id: string, updateData: Partial<Pick<Task, 'title' | 'description' | 'status'>>): Promise<Task> {
    const task = await this.getTaskByIdUseCase.execute(id);

    if (updateData.title !== undefined) task.title = updateData.title;
    if (updateData.description !== undefined) task.description = updateData.description;
    
    if (updateData.status !== undefined) {
      if (updateData.status === 'completed') {
        task.complete();
      } else {
        task.status = updateData.status;
      }
    }

    return this.tasksRepository.update(task);
  }
}