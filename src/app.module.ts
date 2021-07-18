import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { NationsModule } from './nations/nations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule,NationsModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
