import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './schemas/country.schema';
import { Model } from 'mongoose';
import CountryResponseDto from '@libs/dtos/Country/country-response.dto';
import { SearchRequest } from '@libs/search/SearchRequest';
import { mapSearchRequestForMongo } from '@app/utils/mongo-search.utils';
import CountryRequestDto from '@libs/dtos/Country/country-request.dto';

@Injectable()
export class CountryRepository {
	constructor(
		@InjectModel(Country.name)
		private countryModel: Model<Country>,
	) { }

	async create(country: CountryRequestDto ): Promise<CountryResponseDto> {
		const savedCountry = new this.countryModel(country);
		await savedCountry.save();
		return new CountryResponseDto(savedCountry.toObject());
	}

	async createMany(countries: CountryRequestDto[]) {
		const savedCountries = await this.countryModel
			.insertMany(countries);

		console.log(savedCountries);
		
		if (!savedCountries) {
			throw new BadRequestException(`Ticket not found!`);
		}

		return savedCountries;
	}

	async findAll(limit?: number, offset?: number): Promise<CountryResponseDto[]> {
		const selector: SearchRequest = { limit: limit, offset: offset };
		const { filterQuery, queryOptions } = mapSearchRequestForMongo(selector);

		return (await this.countryModel.find(filterQuery, null, queryOptions).lean().exec()).map(
			(item) => new CountryResponseDto(item),
		);
	}

	async update(id: string, country: CountryRequestDto): Promise<CountryResponseDto> {
		const updatedCountry = await this.countryModel
			.findByIdAndUpdate(id, country, { new: true })
			.lean()
			.exec();
		
		if (!updatedCountry) {
			throw new BadRequestException(`Country not found!`);
		}
		return new CountryResponseDto(updatedCountry);
	}

	async delete(id: string): Promise<CountryResponseDto> {
		const deletedCountry = await this.countryModel.findByIdAndRemove(id).lean().exec();
		return new CountryResponseDto(deletedCountry || {});
	}


	async findOneById(id: string): Promise<CountryResponseDto> {
		const country = await this.countryModel.findById(id).lean().exec();
		return new CountryResponseDto(country || {});
	}
}
