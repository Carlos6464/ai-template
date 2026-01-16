/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterUseCase, LoginUseCase } from '@ai-template/application';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    try { return await this.registerUseCase.execute(body); }
    catch (e: any) { throw new HttpException(e.message, HttpStatus.BAD_REQUEST); }
  }

  @Post('login')
  async login(@Body() body: any) {
    try { return await this.loginUseCase.execute(body.email, body.password); }
    catch (e: any) { throw new HttpException(e.message, HttpStatus.UNAUTHORIZED); }
  }
}
