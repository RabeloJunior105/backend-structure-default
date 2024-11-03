import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
config()
@Module({
  imports: [
    ProductModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class CoreAppModule { }
