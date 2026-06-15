import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  model_id: number;

  mime: string;

  file_name: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}
export class UpdateFileDto extends CreateFileDto {}
