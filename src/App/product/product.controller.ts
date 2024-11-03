import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreBaseController } from 'src/Core/core.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@ApiTags("Product")
@Controller('product')
export class ProductController extends CoreBaseController(ProductEntity, {}) {
  constructor(
    public service: ProductService,
  ) {
    super(service)
  }

}