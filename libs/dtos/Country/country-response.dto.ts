// @ts-ignore
import { Expose, Transform } from 'class-transformer';
// @ts-ignore
import { Currency } from '@app/api/Countries/schemas/currency.schema';

export default class CountryResponseDto {
    @Expose()
    @Transform( ({ obj }: { obj: { _id: string }}) => obj._id)
    id: string;

	@Expose()
    name: string;

	@Expose()
	currencies: Currency[];
  
	@Expose()
	active: boolean;
  
    constructor(partial: Partial<CountryResponseDto>) {
        Object.assign(this, partial);
    }
}