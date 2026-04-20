import { Module } from '@nestjs/common';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { DocentesModule } from './docentes/docentes.module';

@Module({
  imports: [EstudiantesModule, DocentesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
