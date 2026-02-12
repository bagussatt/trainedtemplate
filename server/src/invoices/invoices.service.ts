import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    return this.prisma.invoices.create({
      data: {
        custId: createInvoiceDto.custId,
        amount: createInvoiceDto.amount,
        ...(createInvoiceDto.date && { date: new Date(createInvoiceDto.date) }),
        ...(createInvoiceDto.status && { status: createInvoiceDto.status }),
      },
      include: {
        CustomerId: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [invoices, totalCount] = await Promise.all([
      this.prisma.invoices.findMany({
        skip,
        take: limit,
        orderBy: { invoicesId: 'desc' },
        include: {
          CustomerId: true,
        },
      }),
      this.prisma.invoices.count(),
    ]);

    return {
      data: invoices,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    };
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoices.findUnique({
      where: { invoicesId: id },
      include: {
        CustomerId: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const existing = await this.prisma.invoices.findUnique({
      where: { invoicesId: id },
    });

    if (!existing) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoices.update({
      where: { invoicesId: id },
      data: {
        ...(updateInvoiceDto.custId !== undefined && { custId: updateInvoiceDto.custId }),
        ...(updateInvoiceDto.amount !== undefined && { amount: updateInvoiceDto.amount }),
        ...(updateInvoiceDto.date && { date: new Date(updateInvoiceDto.date) }),
        ...(updateInvoiceDto.status && { status: updateInvoiceDto.status }),
      },
      include: {
        CustomerId: true,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.invoices.findUnique({
      where: { invoicesId: id },
    });

    if (!existing) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoices.delete({
      where: { invoicesId: id },
    });
  }
}
