import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/resources/prisma/prisma.service';

@Injectable()
export class SchoolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll({
    whereClause,
    includeClause,
    orderByClause,
    skip,
    take,
  }: {
    whereClause: Prisma.SchoolWhereInput;
    includeClause?: Prisma.SchoolInclude;
    orderByClause?: Prisma.SchoolOrderByWithRelationInput[];
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.school.findMany({
      where: whereClause,
      include: includeClause,
      orderBy: orderByClause,
      skip,
      take,
    });
  }

  async getFirst({
    whereClause,
    includeClause,
  }: {
    whereClause: Prisma.SchoolWhereInput;
    includeClause?: Prisma.SchoolInclude;
  }) {
    return await this.prisma.school.findFirst({
      where: whereClause,
      include: includeClause,
    });
  }

  async create({ data }: { data: Prisma.SchoolCreateInput }) {
    return await this.prisma.school.create({
      data,
    });
  }

  async update({
    whereClause,
    data,
  }: {
    whereClause: Prisma.SchoolWhereUniqueInput;
    data: Prisma.SchoolUpdateInput;
  }) {
    return await this.prisma.school.update({
      where: whereClause,
      data,
    });
  }

  async delete({
    whereClause,
  }: {
    whereClause: Prisma.SchoolWhereUniqueInput;
  }) {
    return await this.prisma.school.delete({
      where: whereClause,
    });
  }
}
