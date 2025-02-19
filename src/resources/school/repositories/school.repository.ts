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
    return this.prisma.school.findMany({
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
    return this.prisma.school.findFirst({
      where: whereClause,
      include: includeClause,
    });
  }

  async create({ data }: { data: Prisma.SchoolCreateInput }) {
    return this.prisma.school.create({
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
    return this.prisma.school.update({
      where: whereClause,
      data,
    });
  }

  async delete({
    whereClause,
  }: {
    whereClause: Prisma.SchoolWhereUniqueInput;
  }) {
    return this.prisma.school.delete({
      where: whereClause,
    });
  }
}
