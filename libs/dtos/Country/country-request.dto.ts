// @ts-ignore
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export default class CountryRequestDto {
  @IsString()
  name: string;

  @IsString()
  currencies: string[];

  @IsBoolean()
  @IsOptional()
  active: boolean;
}