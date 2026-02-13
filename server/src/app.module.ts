import { Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicesModule } from './invoices/invoices.module';
import { LoggingModule } from './logging/logging.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { HashService } from './common/hash.service';

@Module({
  imports: [
    ...(process.env.NODE_ENV === 'production'
      ? [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
        }),
      ]
      : []),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    DashboardModule,
    InvoicesModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService
  ) {

  }
  async onModuleInit() {
//  const user = await  this.prisma.user.create(
//       {

//         data: {
//           email: "admin@domain.com",
//           name: "nama",
//           password: await this.hash.hashPassword("password")
//         }

//       }
//     )


//     console.log(user)
  }
}
