import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class AccountingDataDto {
  @ApiProperty({ example: '123456', description: 'The ID of the household' })
  @IsString()
  @IsNotEmpty()
  householdId: string;

  @ApiProperty({ example: 'data', description: 'The accounting data' })
  @IsString()
  @IsNotEmpty()
  accountingData: string;

  @Exclude()
  private timestamp?: string;

  constructor(partial: Partial<AccountingDataDto>) {
    Object.assign(this, partial);
    if (!this.timestamp) {
      this.timestamp = new Date().toISOString();
    }
  }
}
