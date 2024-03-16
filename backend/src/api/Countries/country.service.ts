import { Injectable } from '@nestjs/common';
import CountryResponseDto from '@libs/dtos/Country/country-response.dto';
import { CountryRepository } from './country.repository';
import CountryRequestDto from '@libs/dtos/Country/country-request.dto';

@Injectable()
export class CountryService {
	constructor(private readonly countryRepository: CountryRepository) { }

	async create(country: CountryRequestDto): Promise<CountryResponseDto> {
		return this.countryRepository.create(country);
	}

	async createMany(countries: CountryRequestDto[]) {
		return this.countryRepository.createMany(countries);
	}

	async findAll(limit?: number, offset?: number): Promise<CountryResponseDto[]> {
		return this.countryRepository.findAll(limit, offset);
	}

	async update(id: string, country: CountryRequestDto): Promise<CountryResponseDto> {
		return this.countryRepository.update(id, country);
	}

	async findOne(id: string): Promise<CountryResponseDto> {
		return this.countryRepository.findOneById(id);
	}

	async delete(id: string): Promise<CountryResponseDto> {
		return this.countryRepository.delete(id);
	}
}
