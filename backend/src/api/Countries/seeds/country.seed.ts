import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { COUNTRIES } from '@libs/ISO-4217/countries';
import CountryRequestDto from '@libs/dtos/Country/country-request.dto';
import { CountryRepository } from '../country.repository';

@Injectable()
export class CountrySeed {
	constructor(
		private readonly countryRepository: CountryRepository
	) { }

	@Command({ command: 'create:countries', describe: 'create countries list' })
	async create() {
		const documents = await this.countryRepository.findAll();
		if (!documents.length) {
			const mappedCountries = COUNTRIES.map((item) => {
				return {	
					name: item.name,
					currencies: item.currencies
				} as CountryRequestDto;
			})
	
			const res = await this.countryRepository.createMany(mappedCountries);
			console.log(res);
		} 
	}
}