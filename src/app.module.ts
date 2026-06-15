import { Module } from '@nestjs/common';
import { DocentesModule } from './docentes/docentes.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [EstudiantesModule, DocentesModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
