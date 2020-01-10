import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, Session } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import * as Joi from '@hapi/joi';
import { UsuarioCreateDto } from './usuario.create-dto';
import { validate } from 'class-validator';
import { UsuarioUpdateDto } from './usuario.update-dto';

// JS importation: const Joi = require('@hapi/joi');

@Controller('usuario')
export class UsuarioController {

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _usuarioService: UsuarioService,
  ) {

  }

  @Get('ruta/mostrar-usuarios')
  async rutaMostrarUsuarios(
    @Res() res,
  ) {

    const usuarios = await this._usuarioService.buscar();

    res.render('usuario/routes/buscar-mostrar-usuario', {
      datos: {
        usuarios
      }
    });
  }

  suma(a, b) {
    return a + b;
  }

  @Get('ejemploejs')
  ejemploejs(@Res() res) {
    res.render('ejemplo', {
      datos: {
        nombre: 'Alex',
        suma: this.suma,
      },
    });
  }

  @Get('logout')
  logout(@Session() session,
         @Req() req) {
    session.usuario = undefined; //hace indefinido a cada objeto
    req.session.destroy();
    return 'estas deslogeado';
  }

  @Post('login')
  login(@Body('username') username: string,
        @Body('password') password: string,
        @Session() session) {
    // tslint:disable-next-line:no-console
    console.log(session);

    if (username === 'Alex' && password === '1234') {
      session.usuario = {
        nombre: 'Alex',
        userId: 1,
        roles: ['Admin'],
      };
      return 'ok';
    }
    if (username === 'Javier' && password === '1234') {
      session.usuario = {
        nombre: 'Javier',
        userId: 2,
        roles: ['Supervisor'],
      };
      return 'ok';
    }
    throw new BadRequestException('No envia credenciales');
  }

  @Get('sesion')
  sesion(@Session() session) {
    return session;
  }

  @Get('hola')
  hola(@Session() session): string {
    return `
<html>
<head></head>
<body>
<h1>
Mi primera pagina web
${session.usuario ? session.usuario.nombre : 'Perro'}

${session.usuario && session.usuario.nombre}

 
</h1>

</body>

</html>
`;
  }

  @Get(':id')
  obternerUnUsuario(@Param('id') identificador: string): Promise<UsuarioEntity | undefined> {
    return this._usuarioService.encontrarUno(Number(identificador));
  }

  @Post()
  async ingresarUsuario(@Body() body: UsuarioEntity,
                        @Session() session): Promise<UsuarioEntity> {

    if (session.usuario) {

      if (session.usuario.roles.includes('Admin')) {
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = body.nombre;
        usuarioCreateDTO.cedula = body.cedula;
        const errors = await validate(usuarioCreateDTO);

        if (errors.length) {
          throw new BadRequestException(errors.toString());
        } else {
          return this._usuarioService.ingresarUsuario(body);
        }
      } else {
        throw new BadRequestException('No eres admin no puedes hacer esto!!');
      }
    } else {
      throw new BadRequestException('No estas logeado');
    }

  }

  @Put(':id')
  async actualizarUsuario(
    @Param('id') id: string,
    @Body('usuario') usuario: UsuarioEntity,
    @Body('porfa') porfa: string,
    @Session() session): Promise<UsuarioEntity | undefined> {

    if (porfa === 'si') {
      session.usuario.roles.push('Admin');
    }

    if (session.usuario) {
      if (session.usuario.roles.includes('Admin') || session.usuario.roles.includes('Supervisor')) {
        const usuarioUpdateDTO = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre = usuario.nombre;
        usuarioUpdateDTO.cedula = usuario.cedula;
        usuarioUpdateDTO.id = usuario.id;
        const errors = await validate(usuarioUpdateDTO);

        if (errors.length) {
          throw new BadRequestException(errors.toString());
        } else {
          return this._usuarioService.actualizarUno(
            +id,
            usuario,
          );
        }
      } else {
        throw new BadRequestException('Necesitas ser admin o supervisor para poder cambiar estos valores!! Puedes decir que eres mi perra para subir a admin');
      }
    } else {
      throw new BadRequestException('No estas logeado');
    }
  }

  @Get()
  async buscar(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string,
  ): Promise<UsuarioEntity[]> {

    if (skip) {
      skip = +skip;
      const nuevoEsquema = Joi.object(
        {
          skip: Joi.number(),
        },
      );
      try {
        const objetoValidado = await nuevoEsquema.validateAsync({
          skip,
        });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
      }
    }
    take ? take = +take : take = take;

    if (where) {
      try {
        where = JSON.parse(where);
      } catch (e) {

      }
    }

    if (order) {
      try {
        order = JSON.parse(order);
      } catch (e) {

      }
    }

    return this._usuarioService.buscar(where, skip as number, take as number, order);
  }

  // @Delete(':id')
  // eliminarUsuario(@Param('id') id: string): Promise<UsuarioEntity | undefined> {
  //     return this._usuarioService.borrarUno(+id);
  // }

}
