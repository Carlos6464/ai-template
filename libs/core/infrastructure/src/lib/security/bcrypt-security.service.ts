import { Injectable } from '@nestjs/common';
import { ISecurityService } from '@ai-template/domain'; // Ajuste para o seu path no Nx
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptSecurityService implements ISecurityService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: object): string {
    return this.jwtService.sign(payload);
  }
}
