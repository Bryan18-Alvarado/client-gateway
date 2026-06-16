import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import type { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ESTUDIANTES_SERVICE, FILES_SERVICES } from 'src/config/service';
import { FileContentDto, FileMetaDto } from 'src/files/dto/response.dto';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    @Inject(ESTUDIANTES_SERVICE) private readonly estudianteClient: ClientProxy,
    @Inject(FILES_SERVICES)
    private readonly filesClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() estudianteDto: CreateEstudianteDto) {
    return this.estudianteClient.send({ cmd: 'create_student' }, estudianteDto);
  }

  @Get()
  findAll() {
    return this.estudianteClient.send({ cmd: 'get_all_student' }, {});
  }
  @Get(':id/avatar')
  async getAvatar(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const meta = await firstValueFrom<FileMetaDto>(
      this.filesClient.send({ cmd: 'get_file_by_model' }, { model_id: id }),
    );

    if (!meta?.file_name) {
      return res.status(404).json({ message: 'Avatar not found' });
    }

    const file = await firstValueFrom<FileContentDto>(
      this.filesClient.send({ cmd: 'get_file_by_name' }, meta.file_name),
    );

    if (!file?.file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const buffer = Buffer.from(file.file, 'base64');

    res.setHeader('Content-Type', file.mime);
    return res.send(buffer);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estudianteClient.send({ cmd: 'get_one_student' }, { id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateestudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudianteClient.send(
      { cmd: 'update_student' },
      {
        id,
        data: updateestudianteDto,
      },
    );
  }

  @Put(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');

    return this.filesClient.send(
      { cmd: 'update_student_file' },
      {
        model_id: id,
        mime: file.mimetype,
        originalName: file.originalname,
        buffer: file.buffer.toString('base64'),
      },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await firstValueFrom(
      this.filesClient.send({ cmd: 'delete_by_model' }, { model_id: id }),
    );

    await firstValueFrom(
      this.estudianteClient.send({ cmd: 'delete_student' }, { id }),
    );

    return {
      message: 'Estudiante  eliminados exitosamente',
    };
  }
}
