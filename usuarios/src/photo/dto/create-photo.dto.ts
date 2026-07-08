import { IsBoolean, IsInt, IsOptional, IsPositive, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsUrl({}, { message: 'La URL de la foto debe ser válida' })
  url: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsInt()
  @IsPositive()
  userId: number;
}


