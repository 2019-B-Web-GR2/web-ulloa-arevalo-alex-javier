import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity) private _repositorioUsuario: Repository<UsuarioEntity>,
  ) {
    // Inyectar dependencias

  }

  // async encontrarUno(id: number) {
  //   const usuarioPromesa = await this._repositorioUsuario.findOne(id);
  //   return usuarioPromesa;
  // }

  encontrarUno(id: number): Promise<UsuarioEntity | undefined> {
    return this._repositorioUsuario.findOne(id);
  }

  ingresarUsuario(usuarioNuevo: UsuarioEntity) {
    return this._repositorioUsuario.save(usuarioNuevo);
  }

  borrarUno(id: number): Promise<DeleteResult> {
    return this._repositorioUsuario.delete(id);
  }

  actualizarUno(id: number, usuario: UsuarioEntity): Promise<UsuarioEntity> {
    usuario.id = id;
    return this._repositorioUsuario.save(usuario); // This function is an upsert
  }

  buscar(
    where: any = {},
    skip: number = 0,
    take: number = 10,
  ) {
    this._repositorioUsuario.find(
      {
        where,
        skip,
        take,
      },
    );
  }

}
