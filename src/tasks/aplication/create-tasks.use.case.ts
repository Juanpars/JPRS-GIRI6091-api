import { Injectable } from '@nestjs/common';
import type { ItasksRepository } from '../domain/tasks.repository.interface';
import {ItasksRepositoryToken} from '../domain/tasks.repository.interface';


@Injectable()

export class CreateTasksUseCase {
    constructor(
        @Inject(ITasksRepositoryToken)
        private readonly tasksRepository: ITasksRepository,
    ) {}
  }
