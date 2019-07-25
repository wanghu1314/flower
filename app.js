//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const bodyParser=require('body-parser');
//首页路由器
const indexRouter=require('./routes/index');
//用户路由器
const userRouter=require('./routes/user');
//商品路由器
const productRouter=require('./routes/product');
//
//2:配置第三方模块
//  //2.1:配置连接池
//  var pool = mysql.createPool({
//    host:"127.0.0.1",
//    user:"root",
//    password:"",
//    port:3306,
//    database:"flower",
//    connectionLimit:15
//  })
 //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true
 }))

 //2.3:session
 server.use(session({
   secret:"128位字符串",
   resave:true,
   saveUninitialized:true
 }))
// 指定静态目录
server.use(express.static("public"))
// server.use(express.static("routes"))

server.use( bodyParser.urlencoded({
  extended:false
}) );

 server.listen(3000);



// // 购物车
// server.get("/cart",(req,res)=>{
//   var uid=req.session.uid;
//   if(!uid){
//     res.send({code:-1,msg:"请登录"});
//     return;
//   }
//   var sql="SELECT cid,img_url,price,count,title FROM flower_cart WHERE uid=?"
//   pool.query(sql,[uid],(err,result)=>{
//     if(err) throw err
//     // console.log(result)
//     res.send({code:1,data:result})
//   })
// })
// //删除购物车商品
// server.get("/delItem",(req,res)=>{
//   // 参数购物车id
//   var id=req.query.cid;
//   var sql="DELETE FROM flower_cart WHERE cid=?";
//   pool.query(sql,[id],(err,result)=>{
//     if (err) throw err;
//     if(result.affectedRows>0){
//       res.send({code :1,msg:"删除成功"})
//     }else{
//       res.send({code:-1,msg:"删除失败"})
//     }
    
//   })
// })
// // 删除多个商品
// server.get("/delAll",(req,res)=>{
//   var ids=req.query.ids;
//   var sql=`DELETE FROM xz_cart WHERE id IN (${ids})`;
//   pool.query(sql,(err,result)=>{
//     if(err) throw err;
//     if(result.affectedRows>0){
//       res.send({code:1,msg:"删除成功"})
//     }
//   })
// })

// 路由器挂载
server.use('/index',indexRouter);
server.use('/user',userRouter);
server.use('/product',productRouter);
