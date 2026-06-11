import { Injectable } from '@nestjs/common';
import { ITasksRepository } from '../../domain/tasks.repository.interface';
import { Task } from '../../domain/tasks.entity';

@Injectable()
export class TasksRepositoryInMemory implements ITasksRepository {
  private tasks: Task[] = [];

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task || null;
  }

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}