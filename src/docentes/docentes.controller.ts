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
import { DOCENTES_SERVICE } from 'src/config/service';
import { CreateDocenteDto, UpdateDocenteDto } from './dto/create-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(
    @Inject(DOCENTES_SERVICE) private readonly docenteClient: ClientProxy,
  ) {}

  @Get()
  getAll() {
    return this.docenteClient.send({ cmd: 'get_all_teacher' }, {});
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.docenteClient.send({ cmd: 'get_one_teacher' }, id);
  }

  @Post()
  create(@Body() docenteDto: CreateDocenteDto) {
    return this.docenteClient.send({ cmd: 'create_teacher' }, docenteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() docenteDto: UpdateDocenteDto,
  ) {
    return this.docenteClient.send(
      { cmd: 'update_teacher' },
      {
        id,
        updateDocente: docenteDto,
      },
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.docenteClient.send({ cmd: 'remove_teacher' }, id);
  }
}
