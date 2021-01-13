
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('link') prodLink: string,
    @Body('price') prodPrice: string,
    @Body('currency') prodCurrency: string,
    @Body('quantity') prodQuantity: number,
    @Body('brand') prodBrand: string,
    @Body('color') prodColor: string,
    @Body('gender') prodGender: string,
    @Body('gtin') prodGtin: string,
    @Body('mpn') prodMpn: string,
    @Body('condition') prodCondition: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodLink,
      prodPrice,
      prodCurrency,
      prodQuantity,
      prodBrand,
      prodColor,
      prodGender,
      prodGtin,
      prodMpn,
      prodCondition,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);  
  
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('link') prodLink: string,
    @Body('price') prodPrice: number,
    @Body('currency') prodCurrency: string,
    @Body('quantity') prodQuantity: number,
    @Body('brand') prodBrand: string,
    @Body('color') prodColor: string,
    @Body('gender') prodGender: string,
    @Body('gtin') prodGtin: string,
    @Body('mpn') prodMpn: string,
    @Body('condition') prodCondition: string,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodLink,
      prodDescription,
      prodPrice,
      prodCurrency,
      prodQuantity,
      prodBrand,
      prodColor,
      prodGender,
      prodGtin,
      prodMpn,
      prodCondition,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }

 
}


