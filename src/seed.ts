import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Nation } from './nations/nation.entity';
import Book from './books/book.entity';
import Category from './categorys/category.entity';
import Publisher from './publishers/publisher.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bookListJson = require('/public/bookList.json')
const roleList = ['user','admin']
const nationList = ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]
const user_password = 'user123'
const admin_password = 'admin123'

const createUser = ()=>{
  const roles = roleList.map((role)=>new Role({name:role}))
  const nations = nationList.map((nation)=>new Nation({name:nation}))
  const user = new User({username:'user',confirmPassword:user_password,password:user_password,roles: roles.slice(0,1),nation:nations[Math.floor(Math.random()*56)]})
  const admin = new User({username:'admin',confirmPassword:admin_password,password:admin_password,roles: roles.slice(1,2),nation:nations[Math.floor(Math.random()*56)]})
  return [roles,nations,user,admin]
}


type B = {category:string,publisher:string,publicationDate:string,author:string,imagePath:string,name:"红楼梦",description:string}
const bookList:B[] = JSON.parse(bookListJson)
const createBook = ()=>{
  const books = bookList.map((book)=>{
    const {category:categoryName,publisher:publisherName,publicationDate,author,name,description,imagePath} = book
    const categoryInstance = new Category({name:categoryName})
    const publisherInstance = new Publisher({name: publisherName})
    return new Book({name,publicationDate,publisher:publisherInstance,categories:[categoryInstance],author,description,imagePath})
  })
  const publishers = bookList.map((book)=>new Publisher({name:book.publisher}))
  
  const categories = bookList.map((book)=>new Category({name:book.category}))
  
  return [publishers,categories,books]
}

createConnection().then(async connection => {
  const {manager}=connection
  const instances = createUser().concat(createBook())
  instances.map( (Item)=> manager.save(Item))
  await connection.close()
}).catch(error => console.log(error));