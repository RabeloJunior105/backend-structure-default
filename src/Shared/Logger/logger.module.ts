import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerController } from './logger.controller';
import { LoggerEntity } from './entity/logger.entity';
import { LoggerService } from './logger.service';


@Module({
  imports: [TypeOrmModule.forFeature([LoggerEntity])],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule { }
