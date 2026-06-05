import { Module } from '@nestjs/common';
import { TaskController } from './controllers/tasks.controller';
import { CreateTasksUseCase } from '../aplication/create-tasks.use.case';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';
import { TasksRepositoryInMemory } from './persistence/tasks.repository.impl';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTasksUseCase,
    {
      provide: ITasksRepositoryToken,
      useClass: TasksRepositoryInMemory,
    },
  ],
  exports: [CreateTasksUseCase],
})
export class TaskModule {} 