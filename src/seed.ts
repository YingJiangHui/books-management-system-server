import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Nation } from './nations/nation.entity';
import Book from './books/book.entity';
import Category from './categorys/category.entity';
import Publisher from './publishers/publisher.entity';
import { salt } from './constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bookListJson = require('../public/bookList.json')
const roleList = ['user','admin']
const nationList = ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]
const user_password = 'reader123'
const admin_password = 'admin123'

const createUser = ()=>{
  const roles = roleList.map((role)=>new Role({name:role}))
  const nations = nationList.map((nation)=>new Nation({name:nation}))
  const user = new User({username:'reader1',email:'15867925894@163.com',confirmPassword:user_password,password:user_password,roles: roles.slice(0,1),nation:nations[Math.floor(Math.random()*56)]})
  user.encryptPass((pass)=>bcrypt.hashSync(pass, salt))
  const admin = new User({username:'admin',email:'15867925894@163.com',confirmPassword:admin_password,password:admin_password,roles: roles.slice(1,2),nation:nations[Math.floor(Math.random()*56)]})
  admin.encryptPass((pass)=>bcrypt.hashSync(pass, salt))
  return [roles,nations,user,admin]
}

const createBorrow = ()=> {

}

type BookInfo = {category:string,publisher:string,publicationDate:string,author:string,imagePath:string,name:"红楼梦",description:string}
const bookList:BookInfo[] = JSON.parse(bookListJson)

const createBook = ()=>
    bookList.reduce((list,book)=>{
    const {category:categoryName,publisher:publisherName,publicationDate,author,name,description,imagePath} = book
    const categoryNameEqualIndex = list[0].map((c)=>c.name).indexOf(categoryName)
    const publisherNameEqualIndex = list[1].map((c)=>c.name).indexOf(publisherName)
    const categoryInstance = categoryNameEqualIndex!==-1? list[0][categoryNameEqualIndex] : new Category({name:categoryName})
    const publisherInstance = publisherNameEqualIndex!==-1? list[1][publisherNameEqualIndex] : new Publisher({name: publisherName})
    const bookInstance = new Book({name,publicationDate,publisher:publisherInstance,categories:[categoryInstance],author,description,imagePath})
    return [[...list[0].concat(categoryNameEqualIndex!==-1?[]:categoryInstance)],[...list[1].concat(publisherNameEqualIndex!==-1?[]:publisherInstance)],[...list[2].concat(bookInstance)]]
  },[[],[],[]])

createConnection().then(async connection => {
  const {manager}=connection
  const instances = createUser().concat(createBook())
  for (const Item of instances){
    await manager.save(Item,{})
  }
  await connection.close()
}).catch(error => console.log(error));