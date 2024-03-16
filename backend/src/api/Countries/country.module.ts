import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryRepository } from './country.repository';
import { CountrySeed } from './seeds/country.seed';
import { CommandModule } from 'nestjs-command';

@Module({
	imports: [CommandModule, MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],
	controllers: [CountryController, CountrySeed],
	providers: [CountryService, CountryRepository, CountrySeed],
})
export class CountryModule { }
