const express=require("express");
const router=express.Router();
const pool=require('../pool.js');


router.get('/index',(req,res)=>{
    var sql="SELECT * FROM flower_index_product";
    pool.query(sql,(err,result)=>{
      if (err) throw err;
      
      res.send(result);
    })
  
  })

  router.get("/cindex",(req,res)=>{
    var sql="SELECT title,pic FROM flower_index_product "
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
    })
  })
  router.get("/carousel",(req,res)=>{
    var sql="SELECT title,img,href FROM flower_index_carousel"
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
      console.log(result)
    })
  })


module.exports=router;