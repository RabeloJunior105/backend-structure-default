import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreBaseController } from 'src/Core/core.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';


@ApiTags("User")
@Controller('user')
export class UserController extends CoreBaseController(UserEntity, {}) {
  constructor(
    public service: UserService,
  ) {
    super(service)
  }

}