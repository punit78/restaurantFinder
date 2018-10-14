var express=require('express');
var request=require('request-promise');
var path=require('path');
var bodyParser=require('body-parser')
var app=express();

var port=3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'ui','index.html'));
})

app.post('/getdata',(req,res)=>
{
   var lat=req.body.lati;
   var long=req.body.longi;
   //console.log(lat +" "+ long);
   const data={
       method:'get',
       url:'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
       qyery:{
             location:[lat,long],
             radius:1500,
             type:'restaurant',
             key:'AIzaSyC4QRY9pbKZ06jRpsQC_RpsNw1rNmiLqYU'  
       }
    };
     request(data)
       .then((result)=>{
      res.send(result);
       })
        .catch((err)=>{
    console.log(err);
        })  
       
});


   


app.listen(port,()=>{
    console.log(`Restaurant app listening on port ${port}`);
})