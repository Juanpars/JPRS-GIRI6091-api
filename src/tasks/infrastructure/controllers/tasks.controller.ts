import { Controller, Get, Inject, Post, Body, HttpStatus, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiAcceptedResponse, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateTasksUseCase } from '../../aplication/create-tasks.use.case';
import { GetTaskByIdUseCase } from '../../aplication/get-task-by-id-use-case';
import { DeleteTaskUseCase } from '../../aplication/delete-task-use-case';
import { UpdateTaskUseCase } from '../../aplication/update-task-use-case';
import { type ITasksRepository } from '../../domain/tasks.repository.interface';
import { ITasksRepositoryToken } from '../../domain/tasks.repository.interface';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { UpdateTaskDto } from './dtos/update-task-dto';

@ApiTags('tasks')
@Controller({ path: 'tasks', version: '1' })
export class TaskController {
  constructor(
    private readonly createTaskCase: CreateTasksUseCase,
    private readonly getTaskCase: GetTaskByIdUseCase,
    private readonly deleteTestCase: DeleteTaskUseCase,
    private readonly updateTaskCase: UpdateTaskUseCase,
    @Inject(ITasksRepositoryToken) private readonly taskRepository: ITasksRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  async findAll() {
    return this.taskRepository.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'La tarea ha sido creada exitosamente.' })
  async create(@Body() task: CreateTasksDto) {
    return this.createTaskCase.execute(task.title, task.description);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la tarea a recuperar' })
  @ApiResponse({ status: HttpStatus.OK, description: 'La tarea ha sido recuperada exitosamente.' })
  async findOne(@Param('id') id: string) {
    return this.getTaskCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la tarea a actualizar' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.updateTaskCase.execute(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una tarea por ID' })
  @ApiParam({ name: 'id', description: 'El ID de la tarea a eliminar' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'La tarea ha sido eliminada exitosamente.' })
  async delete(@Param('id') id: string) {
    return this.deleteTestCase.execute(id);
  }
}