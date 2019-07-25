const express=require("express");
const router=express.Router();
const pool=require('../pool.js');
//
// 商品的分页显示
router.get('/product',(req,res)=>{
  //1. 参数
  var pno=req.query.pno;
  var ps=req.query.ps;
  // 2.设置默认值
  if(!pno){pno=1};
  if(!ps){ps=16};
  // 3.创建两条SQL语句执行
  var sql="SELECT sid,fid,title,price FROM flower LIMIT ?,?";
  var offset=(pno-1)*ps;
  ps=parseInt(ps);
  // 4.返回值{code:1,msg:"查询成功",data:[],pageCount:}
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    var product={code:1,msg:"查询成功",data:result}
    product.data=result;

    var sql="SELECT count(*) AS c FROM flower"
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      var pages=result[0].c;
        var pc=Math.ceil(result[0].c/ps);
        product.pages=pages;
        product.pc=pc;
        var sql="SELECT pid,img FROM flower_pic"
        pool.query(sql,(err,result)=>{
          if(err) throw err
          var pics=result;
          console.log(result)
          product.pics=pics;
          res.send(product);
          console.log()
        })
        

    })
    
  })
})


module.exports=router;