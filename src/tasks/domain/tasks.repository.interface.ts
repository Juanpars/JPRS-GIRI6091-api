import { Task } from './tasks.entity';

export interface ITasksRepository {
    create(task: Task): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    update(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}

export const ITasksRepositoryToken = Symbol('ITasksRepository');