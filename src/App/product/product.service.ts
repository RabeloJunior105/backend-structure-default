import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreBaseService } from 'src/Core/core.service';
import { ProductEntity } from './product.entity';


@Injectable()
export class ProductService extends CoreBaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity) repo: Repository<ProductEntity>
  ) {
    super(repo)
  }

}