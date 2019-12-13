import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {

  }

  @Get(':id')
  obternerUnUsuario(@Param('id') identificador: string): Promise<UsuarioEntity | undefined> {
    return this._usuarioService.encontrarUno(Number(identificador));
  }

  @Post()
  ingresarUsuario(@Body() body: UsuarioEntity): Promise<UsuarioEntity | undefined> {
    return this._usuarioService.ingresarUsuario(body);

  }

}
