// @ts-ignore
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export default class CountryRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  currencies?: string[];

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}