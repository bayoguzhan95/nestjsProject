import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    link: string,
    price: string,
    currency: string,
    quantity: number,
    brand: string,
    color: string,
    gender: string,
    gtin: string,
    mpn: string,
    condition: string,
  ) {
    const newProduct = new this.productModel({
      title,
      description,
      link,
      price,
      currency,
      quantity,
      brand,
      color,
      gender,
      gtin,
      mpn,
      condition,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      link: prod.link,
      price: prod.price,
      currency: prod.currency,
      quantity: prod.quantity,
      brand: prod.brand,
      color: prod.color,
      gender: prod.gender,
      gtin: prod.gtin,
      mpn: prod.mpn,
      condition: prod.condition,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      link: product.link,
      price: product.price,
      currency: product.currency,
      quantity: product.quantity,
      brand: product.brand,
      color: product.color,
      gender: product.gender,
      gtin: product.gtin,
      mpn: product.mpn,
      condition: product.condition,
    };
  }

  async updateProduct(
    productId: string,

    title: string,
    description: string,
    link: string,
    price: number,
    currency: string,
    quantity: number,
    brand: string,
    color: string,
    gender: string,
    gtin: string,
    mpn: string,
    condition: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }

    if (link) {
      updatedProduct.link = link;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (currency) {
      updatedProduct.currency = currency;
    }
    if (quantity) {
      updatedProduct.quantity = quantity;
    }
    if (brand) {
      updatedProduct.brand = brand;
    }
    if (color) {
      updatedProduct.color = color;
    }
    if (gender) {
      updatedProduct.gender = gender;
    }
    if (gtin) {
      updatedProduct.gtin = gtin;
    }
    if (mpn) {
      updatedProduct.mpn = mpn;
    }
    if (condition) {
      updatedProduct.condition = condition;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
  
}

