import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDocenteDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsNumber()
  @IsNotEmpty()
  etnia_id: number;

  @IsNumber()
  @IsNotEmpty()
  cargo_id: number;

  @IsNumber()
  @IsNotEmpty()
  sexo_id: number;
}

export class UpdateDocenteDto extends CreateDocenteDto {}
