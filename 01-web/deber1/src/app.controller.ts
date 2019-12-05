import {Controller, Delete, Get, Headers, Body, HttpCode, Post, Put, Query} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('suma')
    getSuma(@Headers() cabeceras,
            @Headers('numerouno') numeroUno,
            @Headers('numerodos') numeroDos) {
        return `Las suma es: ${Number(numeroUno) + Number(numeroDos)}`;
    }

    @Post('resta')
    @HttpCode(201)
    postResta(
              @Body('numerouno') numeroUno: number,
              @Body('numerodos') numeroDos: number) {
        return `Las resta es: ${Number(numeroUno) - Number(numeroDos)}`;
    }

    @Put('multiplicacion')
    @HttpCode(202)
    putMultiplicacion(
                      @Query('numerouno') numeroUno: number,
                      @Query('numerodos') numeroDos: number) {

        return `Las multiplicacion es: ${Number(numeroUno) * Number(numeroDos)}`;

    }

    @Delete('division')
    @HttpCode(203)
    deleteDivision(
        @Headers('dividendo') header1: number,
        @Headers('divisor') header2: number,
        @Body('dividendo') body1: number,
        @Body('divisor') body2: number,
        @Query('dividendo') query1: number,
        @Query('divisor') query2: number,
    ) {
        return `Las division de header es: ${Number(header1) / Number(header2)}
        Las division de body es: ${Number(body1) / Number(body2)}
        Las division de query es: ${Number(query1) / Number(query2)}`;
    }

}
