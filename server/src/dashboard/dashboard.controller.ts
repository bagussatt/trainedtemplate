import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('revenue')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get revenue data for chart',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          month: { type: 'string' },
          revenue: { type: 'number' },
        },
      },
    },
  })
  async fetchRevenue() {
    return this.dashboardService.fetchRevenue();
  }

  @Get('latest-invoices')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get 5 latest invoices',
  })
  async fetchLatestInvoices() {
    return this.dashboardService.fetchLatestInvoices();
  }

  @Get('card-data')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get dashboard card summary',
    schema: {
      type: 'object',
      properties: {
        totalCustomers: { type: 'number' },
        totalRevenue: { type: 'number' },
        totalInvoices: { type: 'number' },
        pendingInvoices: { type: 'number' },
      },
    },
  })
  async fetchCardData() {
    return this.dashboardService.fetchCardData();
  }

  @Get('invoices')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get paginated invoices',
  })
  async fetchFilteredInvoices(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.dashboardService.fetchFilteredInvoices(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get('invoices/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get invoice by ID',
  })
  async fetchInvoicesById(@Param('id') id: string) {
    return this.dashboardService.fetchInvoicesById(Number(id));
  }

  @Get('customers')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get all customers',
  })
  async fetchCustomers() {
    return this.dashboardService.fetchCustomers();
  }
}
