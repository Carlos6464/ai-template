import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';           // ou o caminho que você gerou
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';   // ou use Pool do seu provedor

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Cria o pool de conexões (muito recomendado!)
    const connectionString = process.env['DATABASE_URL'];

    const pool = new Pool({ connectionString });

    const adapter = new PrismaPg(pool);

    // ← Aqui está a mágica
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
