const express=require("express");
const router=express.Router();
const pool=require('../pool.js');
// 用户注册
//用户检索
// router.post("/check",(req,res)=>{
//     var $phone=req.body.phone;
//      console.log(req.body.phone);
    
//     var sql="select * from cake_user where phone=?";
//     pool.query(sql,[$phone],(err,result)=>{
//         if(err) throw err;
//         // console.log(result);
//         if(result.length>0){
//             res.send("1");
//         }else{
//             res.send("0");
//         }
//     });
// });


// //用户注册
// router.post("/reg",(req,res)=>{
//     // var $phone=req.body.phone;
//     // var $upwd=req.body.upwd;
//     // var $brithday=req.body.brithday;
//      var obj=req.body;
//      console.log(obj);
//     var sql="insert into cake_user set ?";
//     pool.query(sql,[obj],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         if(result.affectedRows>0){
            
//             res.send("1");
//         }else{
//             res.send("0");
//         }

//     });
// });
// 用户登录


router.get("/login",(req,res)=>{
    //1:参数
    console.log(1111111)
    var phone = req.query.phone;
    var upwd = req.query.upwd;
  console.log(uname,upwd)
    //1.1:正则表达式验证用户名或密码
    //2:sql
  var sql = "SELECT uid FROM ";
  sql +=" flower_user WHERE phone = ?";
  sql +=" AND upwd = md5(?)";
    //3:json
    pool.query(sql,[phone,upwd],(err,result)=>{
      console.log(result)
        if(err)throw err;
        if(result.length==0){
           res.send({code:-1,msg:"用户名或密码有误"});
        }else{
           //??缺少一步   将当前登录的用户UID保存到session
           //result=[{id:1}]
           req.session.uid=result[0].uid;
           res.send({code:1,msg:"登录成功"});
        }
    })
  })



module.exports=router;