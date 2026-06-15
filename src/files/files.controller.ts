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
import { FILES_SERVICES } from 'src/config/service';
import { CreateFileDto, UpdateFileDto } from './dto/create-files.dto';
@Controller('files')
export class FilesController {
  constructor(
    @Inject(FILES_SERVICES) private readonly filesClient: ClientProxy,
  ) {}

  @Get()
  getAll() {
    return this.filesClient.send({ cmd: 'get_all_files' }, {});
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send({ cmd: 'get_one_files' }, id);
  }

  @Post()
  create(@Body() filesDto: CreateFileDto) {
    return this.filesClient.send({ cmd: 'create_files' }, filesDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() filesDto: UpdateFileDto,
  ) {
    return this.filesClient.send(
      { cmd: 'update_files' },
      {
        id,
        data: filesDto,
      },
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send({ cmd: 'delete_files' }, id);
  }
}
