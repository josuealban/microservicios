import {
  IsEmail, IsString, IsInt, IsNumber, IsOptional,
  IsEnum, IsArray, MinLength, Min, Max,
} from 'class-validator';
import { Gender } from '../../domain/enums/gender.enum';
import { SubscriptionTier } from '../../domain/enums/subscription-tier.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString({ message: 'El nombre es requerido' })
  name: string;

  @IsInt()
  @Min(18, { message: 'Debes tener al menos 18 años' })
  @Max(100)
  age: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zodiacSign?: string;

  @IsOptional()
  @IsString()
  seeking?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];

  @IsOptional()
  @IsString()
  spotifyId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  musicList?: string[];

  @IsOptional()
  @IsEnum(SubscriptionTier)
  subscription?: SubscriptionTier;
}


