import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  logger = new Logger(PrismaService.name);

  constructor() {
    const isDev = process.env.NODE_ENV !== 'production';

    super({
      log: isDev ? [{ emit: 'event', level: 'query' }] : [],
    });

    if (isDev) {
      this.$on('query' as never, (e: Prisma.QueryEvent) => {
        this.logger.debug(`${e.duration}ms - ${e.params} - Query: ${e.query}`);
      });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
