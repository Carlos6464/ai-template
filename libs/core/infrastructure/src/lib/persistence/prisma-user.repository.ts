import { Injectable } from '@nestjs/common';
import { UserEntity, IUserRepository } from '@ai-template/domain';
import { PrismaService } from '@ai-template/prisma';

@Injectable()
export class PrismaUserRepository implements IUserRepository {

  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    if(!user.password) {
      throw new Error('Password is required to create a user');
    }
    const createdUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return new UserEntity(
      createdUser.email,
      createdUser.password,
      createdUser.id,
      createdUser.name
    );
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user.email, user.password, user.id, user.name);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user.email, user.password, user.id, user.name);
  }
}
