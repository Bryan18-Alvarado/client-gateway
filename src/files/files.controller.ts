import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILES_SERVICES } from 'src/config/service';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(FILES_SERVICES)
    private readonly filesClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body('model_id') model_id: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.filesClient.send(
      { cmd: 'create_files' },
      {
        model_id: Number(model_id),
        mime: file.mimetype,
        originalName: file.originalname,
        buffer: file.buffer.toString('base64'),
      },
    );
  }

  @Delete(':id/avatar')
  removeAvatar(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send({ cmd: 'delete_by_model' }, { model_id: id });
  }
}
