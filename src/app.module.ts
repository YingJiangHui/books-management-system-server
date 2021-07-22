import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountModule } from './account/account.module';
import { NationsModule } from './nations/nations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(),AccountModule,NationsModule,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
