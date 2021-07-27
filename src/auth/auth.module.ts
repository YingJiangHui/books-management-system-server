import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { JwtStrategy } from './jwt.strategy';

//通过导入 JWT 签名时使用的相同密钥，我们可以确保 Passport 执行的验证阶段和 AuthService 执行的签名阶段使用公共密钥。
@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: jwtConstants.secret,signOptions: { expiresIn: '30 days' }, }),
    UsersModule
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
