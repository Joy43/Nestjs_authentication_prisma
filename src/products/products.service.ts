import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

 async create(dto: CreateProductDto) {
  return this.prisma.product.create({
    data: {
      name: dto.name,
      price: dto.price,
      availability: dto.availability,
      sale: dto.sale,
      description: dto.description,
    },
  });
}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        reviews: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        reviews: true,
      },
    });
  }

async update(id: string, dto: UpdateProductDto) {
  return this.prisma.product.update({
    where: { id },
    data: {
      ...dto,
    },
  });
}

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
