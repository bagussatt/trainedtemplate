import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Invoice created successfully',
  })
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get all invoices with pagination',
  })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.invoicesService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get invoice by ID',
  })
  async findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Invoice updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(Number(id), updateInvoiceDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.invoicesService.remove(Number(id));
  }
}
