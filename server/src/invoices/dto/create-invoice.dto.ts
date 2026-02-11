import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNumber()
  custId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ required: false, enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
