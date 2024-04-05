import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> =>{
      const uri = configService.get<string>('MONGODB_URI');
      const dbName = configService.get<string>('MONGODB_DB');
      return await mongoose.connect(`${uri}/${dbName}`);
    },
    inject: [ConfigService],
  },
];
