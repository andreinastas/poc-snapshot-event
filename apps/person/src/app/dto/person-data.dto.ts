import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class PersonDataDto {
  @ApiProperty({ example: '123456', description: 'The ID of the household' })
  @IsString()
  @IsNotEmpty()
  householdId: string;

  @ApiProperty({ example: 'data', description: 'The person data' })
  @IsString()
  @IsNotEmpty()
  personData: string;

  @Exclude()
  private timestamp?: string;

  constructor(partial: Partial<PersonDataDto>) {
    Object.assign(this, partial);
    if (!this.timestamp) {
      this.timestamp = new Date().toISOString();
    }
  }
}
