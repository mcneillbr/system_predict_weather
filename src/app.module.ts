import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CiotdModule } from './ciotd/ciotd.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './jobs/task.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    GracefulShutdownModule.forRoot({
      cleanup: async (app) => {
        // releasing resources

      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    // MongooseModule.forRoot('mongodb://localhost/master'),
    MongooseModule.forRootAsync({
      connectionName: 'master',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DB'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CiotdModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
