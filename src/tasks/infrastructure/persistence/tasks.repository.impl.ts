import { Injectable } from '@nestjs/common';
import { ITasksRepository } from '../../domain/tasks.repository.interface';
import { Task } from '../../domain/tasks.entity';

@Injectable()
export class TasksRepositoryInMemory implements ITasksRepository {
  private tasks: Task[] = [];

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }
}