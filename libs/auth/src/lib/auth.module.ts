import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@ai-template/prisma';
import { AuthController } from './auth.controller';
import { PrismaUserRepository, BcryptSecurityService } from '@ai-template/infrastructure';
import { RegisterUseCase, LoginUseCase } from '@ai-template/application';

@Module({
  imports: [JwtModule.register({ secret: process.env['JWT_SECRET'], signOptions: { expiresIn: '1d' } })],
  providers: [
    PrismaService,
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'ISecurityService', useClass: BcryptSecurityService },
    {
      provide: RegisterUseCase,
      inject: ['IUserRepository', 'ISecurityService'],
      useFactory: (repo, sec) => new RegisterUseCase(repo, sec),
    },
    {
      provide: LoginUseCase,
      inject: ['IUserRepository', 'ISecurityService'],
      useFactory: (repo, sec) => new LoginUseCase(repo, sec),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
