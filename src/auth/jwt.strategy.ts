import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

// 使用cookies中的token认证
const cookieExtractor = function(req) {
  return req?.cookies?.['jwt']?.['access_token'];
};

// 验证阶段
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor, //提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供token的标准方法
      ignoreExpiration: false, //为了明确起见，我们选择默认的 false 设置，它将确保 JWT 没有过期的责任委托给 Passport 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应。护照会自动为我们办理。
      secretOrKey: jwtConstants.secret, // 无论如何，不要把这个秘密公开。生产环境下参见：https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
    });
  }
  //对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递。根据 JWT 签名的工作方式，我们可以保证接收到之前已签名并发给有效用户的有效 token 令牌。
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username, roles: payload.roles };
  }
}
