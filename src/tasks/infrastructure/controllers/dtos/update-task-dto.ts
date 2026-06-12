import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTasksDto } from './create-tasks.dto';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTasksDto) {
  @ApiProperty({
    description: 'The status of the task',
    enum: ['pending', 'in_progress', 'completed'],
    example: 'in_progress',
    required: false,
  })
  @IsIn(['pending', 'in_progress', 'completed'], {
    message: 'Status must be one of the following values: pending, in progress, completed',
  })
  @IsOptional()
  status?: 'pending' | 'in_progress' | 'completed';
}