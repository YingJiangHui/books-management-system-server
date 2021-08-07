import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { NationsModule } from '../nations/nations.module';
import { AuthModule } from '../auth/auth.module';
import { Connection } from 'typeorm';
import { AccountController } from './account.controller';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [UsersModule,NationsModule,AuthModule,RolesModule],
  controllers: [AccountController],
  exports: []
})
export class AccountModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
