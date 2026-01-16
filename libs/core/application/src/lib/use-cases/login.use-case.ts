import { IUserRepository, ISecurityService } from '@ai-template/domain';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository, private securityService: ISecurityService) {}

  async execute(email: string, pass: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password && (await this.securityService.comparePassword(pass, user.password))) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.securityService.generateToken(payload),
        user: { id: user.id, email: user.email, name: user.name }
      };
    }
    throw new Error('Credenciais inválidas');
  }
}
