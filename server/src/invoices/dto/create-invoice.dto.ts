import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNumber()
  custId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    required: false,
    type: String,
    format: 'date-time',
    description: 'ISO 8601 datetime format (e.g., 2026-02-01T10:00:00Z)',
    example: '2026-02-01T10:00:00Z'
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @ApiProperty({ required: false, enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
