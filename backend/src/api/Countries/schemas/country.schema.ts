import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
	@Prop({
		type: String,
		default: function genUUID() {
			return uuidv4();
		},
	})
	_id: string;

	@Prop({ require: true })
	name: string;

	@Prop({
		require: true
	})
	currencies: string[];

	@Prop({
		require: false,
		default: true
	})
	active?: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
