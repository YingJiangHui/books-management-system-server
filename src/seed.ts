import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Nation } from './nations/nation.entity';
const roleList = ['user','admin']
const nationList = ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]
createConnection().then(async connection => {
  const {manager}=connection
  const roles = roleList.map((role)=>new Role({name:role}))
  const nations = nationList.map((nation)=>new Nation({name:nation}))
  const user = new User({username:'user',passwordDigest:'123456',roles: roles.slice(0,1),nation:nations[Math.floor(Math.random()*56)]})
  const admin = new User({username:'admin',passwordDigest:'123456',roles: roles.slice(1,2),nation:nations[Math.floor(Math.random()*56)]})
  await manager.save(roles)
  await manager.save(nations)
  await manager.save(user)
  await manager.save(admin)
  await connection.close()
}).catch(error => console.log(error));