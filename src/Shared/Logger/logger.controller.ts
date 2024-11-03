import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreBaseController } from 'src/Core/core.controller';
import { LoggerEntity } from './entity/logger.entity';
import { LoggerService } from './logger.service';

@ApiTags("Logger")
@Controller('logger')
export class LoggerController extends CoreBaseController(LoggerEntity, {}) {
  constructor(
    public service: LoggerService,
  ) {
    super(service)
  }

}