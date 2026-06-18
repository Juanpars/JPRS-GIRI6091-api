import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTasksDto {
  @ApiProperty({ 
    description: 'Título de la tarea', 
    example: 'Comprar leche', 
    required: true 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @ApiProperty({ 
    description: 'Descripción detallada de la tarea', 
    example: 'Ir al supermercado antes de que cierre', 
    required: false 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  description!: string;
}