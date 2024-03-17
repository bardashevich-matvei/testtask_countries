import {
	Controller,
	Patch,
	Get,
	Post,
	Body,
	ClassSerializerInterceptor,
	UseInterceptors,
	SerializeOptions,
	Param,
	Query,
	Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import CountryRequestDto from '@libs/dtos/Country/country-request.dto';
import CountryResponseDto from '@libs/dtos/Country/country-response.dto';

@Controller('countries')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class CountryController {
	constructor(private readonly countryService: CountryService) { }

	@Post()
	async create(@Body() country: CountryRequestDto) {
		return await this.countryService.create(country);
	}

	@Patch(':id')
	async update(@Body() country: CountryRequestDto, @Param('id') id: string): Promise<CountryResponseDto> {
		return this.countryService.update(id, country);
	}

	@Get()
	async find(@Query('limit') limit?: number, @Query('offset') offset?: number): Promise<CountryResponseDto[]> {
		return this.countryService.findAll(limit, offset);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<CountryResponseDto> {
		return this.countryService.delete(id);
	}
}
