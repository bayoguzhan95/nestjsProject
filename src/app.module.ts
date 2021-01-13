import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
require("dotenv").config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(process.env.DATABASE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
