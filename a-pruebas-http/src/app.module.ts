import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    TypeOrmModule.forRoot(
      {

        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 32769,
        username: 'root',
        password: 'root',
        database: 'Web',
        // dropSchema: true,
        entities: [
          UsuarioEntity,
        ],
        synchronize: true, // Crear -> true , Conectar -> false
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor() {
  }

}
