import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from '@Common/configuration';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: process.env.NODE_ENV == 'local' ? '.env' : process.env.NODE_ENV == 'development' ? '.env.development' : '.env.production',
            validationSchema: Joi.object({ // 환경변수 유효성 체크
                NODE_ENV: Joi.string().valid('local','development', 'production', 'testing', 'staging').required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.string().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                // namingStrategy: new SnakeNamingStrategy(),
                legacySpatialSupport: false,
                logging: true,
                acquireTimeout: 5000,
                charset: 'UTF8MB4_GENERAL_CI',
                entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
                synchronize: false, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성
                extra: {
                    connectionLimit: configService.get('CONNECTION_LIMIT')
                }
            }),
        }),
    ],
})
export class DatabaseModule {}