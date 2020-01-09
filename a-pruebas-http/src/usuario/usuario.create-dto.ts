import { IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';

export class UsuarioCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  cedula: string;
}
