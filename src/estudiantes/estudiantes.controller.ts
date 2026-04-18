import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ESTUDIANTES_SERVICE } from 'src/config/service';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    @Inject(ESTUDIANTES_SERVICE) private readonly estudianteClient: ClientProxy,
  ) {}

  @Get()
  getAll() {
    return this.estudianteClient.send({ cmd: 'get_all_student' }, {});
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudianteClient.send({ cmd: 'get_one_student' }, id);
  }

  @Post()
  create(@Body() estudianteDto: CreateEstudianteDto) {
    return this.estudianteClient.send({ cmd: 'create_student' }, estudianteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() estudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudianteClient.send(
      { cmd: 'update_student' },
      {
        id,
        data: estudianteDto,
      },
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudianteClient.send({ cmd: 'remove_student' }, id);
  }
}
