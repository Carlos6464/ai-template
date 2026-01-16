/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserEntity, IUserRepository, ISecurityService } from '@ai-template/domain';

export class RegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private securityService: ISecurityService
  ) {}

  async execute(data: any) {
    const exists = await this.userRepository.findByEmail(data.email);
    if (exists) throw new Error('Este usuário já existe.');

    const hashedPassword = await this.securityService.hashPassword(data.password);

    // O ID não é passado aqui, pois o Prisma usará autoincrement()
    const newUser = new UserEntity(data.email, hashedPassword, undefined, data.name);

    return this.userRepository.create(newUser);
  }
}
