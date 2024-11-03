import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { CoreAppModule } from './App/core.module';
import { SharedModule } from './Shared/shared.module';
import { LoggerMiddleware } from './Shared/Handler/Midleware/logger.middleware';
import { LoggerModule } from './Shared/Logger/logger.module';

config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}'), join(__dirname, '**', '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    CoreAppModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    /*    .apply(TokenMiddleware)
       .forRoutes({ path: '*', method: RequestMethod.POST })
       .apply(TokenMiddleware)
       .forRoutes({ path: '*', method: RequestMethod.PUT })
       .apply(TokenMiddleware)
       .forRoutes({ path: '*', method: RequestMethod.PATCH })
       .apply(AuditMiddleware).forRoutes('*'); */
  }
}

