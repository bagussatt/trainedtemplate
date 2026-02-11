import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchRevenue() {
    const revenue = await this.prisma.revenue.findMany({
      orderBy: { month: 'asc' },
    });

    return revenue.map((r) => ({
      month: new Date(r.month).toLocaleString('default', { month: 'short' }),
      revenue: r.revenue,
    }));
  }

  async fetchLatestInvoices() {
    return this.prisma.invoices.findMany({
      take: 5,
      orderBy: { invoicesId: 'desc' },
      include: {
        CustomerId: true,
      },
    });
  }

  async fetchCardData() {
    const [totalCustomers, totalRevenue, totalInvoices] = await Promise.all([
      this.prisma.customers.count(),
      this.prisma.revenue.aggregate({
        _sum: { revenue: true },
      }),
      this.prisma.invoices.count(),
    ]);

    return {
      totalCustomers,
      totalRevenue: totalRevenue._sum.revenue || 0,
      totalInvoices,
      pendingInvoices: 0, // TODO: Add status field to Invoices model if needed
    };
  }

  async fetchFilteredInvoices(page: number = 1, limit: number = 10) {
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

  async fetchInvoicesById(id: number) {
    return this.prisma.invoices.findUnique({
      where: { invoicesId: id },
      include: {
        CustomerId: true,
      },
    });
  }

  async fetchCustomers() {
    return this.prisma.customers.findMany({
      select: {
        customerId: true,
        name: true,
        email: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
