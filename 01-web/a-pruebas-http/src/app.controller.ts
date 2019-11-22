import {Controller, Get, HttpCode, InternalServerErrorException, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @HttpCode(200)
    @Post()
    adiosMundo(): string {
        const segundos = this.obtenerSegundos();

        if (segundos % 2 === 0) {
            return 'Adios mundo';
        } else {
            throw new InternalServerErrorException(
                'es impar'
            )
        }


    }

    private obtenerSegundos(): number {
        return new Date().getSeconds();
    }


}


// class Usuario {
//
//   constructor(
//       public nombre: string,
//       public apellido: string
//   ) {
//
//   }
//
//   public cedula: string = "1804535233";
//   cedula2 = "1804535233";
//   private holaMundo(): void {
//     console.log("holi");
//   }
// }

class Usuario2 {

    constructor(
        public nombre: string,
        public apellido?: string, //parametro opcional
    ) {
    }
}

const alex = new Usuario2("alex", "ulloa");

interface Pokemon {
    id: number;
    nombre: string;
    entrenador: Entrenador | number;
}

interface Entrenador {
    id: number;
    nombre: string;
}

const ash: Entrenador = {
    id: 1,
    nombre: 'Ash'
};

const pikachu: Pokemon = {
    id: 1,
    nombre: 'pikachu',
    entrenador: {
        id: 1,
        nombre: 'Ash'
    }
};

