import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreBaseService } from 'src/Core/core.service';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService extends CoreBaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repo: Repository<UserEntity>
  ) {
    super(repo)
  }

}