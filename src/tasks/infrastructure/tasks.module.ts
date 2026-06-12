import { Module } from '@nestjs/common';
import { TaskController } from './controllers/tasks.controller';
import { CreateTasksUseCase } from '../aplication/create-tasks.use.case';
import { GetTaskByIdUseCase } from '../aplication/get-task-by-id-use-case';
import { DeleteTaskUseCase } from '../aplication/delete-task-use-case';
import { UpdateTaskUseCase } from '../aplication/update-task-use-case';
import { ITasksRepositoryToken } from '../domain/tasks.repository.interface';
import { TasksRepositoryInMemory } from './persistence/tasks.repository.impl';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTasksUseCase,
    GetTaskByIdUseCase,
    DeleteTaskUseCase,
    UpdateTaskUseCase,
    {
      provide: ITasksRepositoryToken,
      useClass: TasksRepositoryInMemory,
    },
  ],
  exports: [CreateTasksUseCase, GetTaskByIdUseCase, DeleteTaskUseCase, UpdateTaskUseCase],
})
export class TaskModule {}