import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './api/Countries/country.module';
import { AppLoggerMiddleware } from './utils/logger.utils';

@Module({
	imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/Countries'), CountryModule],
	providers: [],
})

export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
	}
}
