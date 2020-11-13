const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const pool = require('./data/config');

var bodyParser = require('body-parser');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






app.get('/api/users/:qrcode',(request, response)=>{
    const qrcode = request.params.qrcode;
    pool.query('SELECT * FROM userdetails where qrcode = ?',qrcode,(err,result)=>{
        if(err) throw err;
        response.send(result);
    });
});
app.post('/api/users/save',(req , res)=>{
    console.log(req.body);
  var postData  = req.body;
  var data=postData.length;
for(var i=0;i<data;i++)
{
  pool.query('INSERT INTO fooddetails SET ?', postData[i],function (err, result) {
    if (err) throw err;
    
    res.end(JSON.stringify(result));
  });
}
console.log(+i+" record inserted");
}); 

/* 
app.post('/api/users/save',(req , res)=>{
  console.log(req.body);
var postData  = req.body;
var sql = "INSERT INTO fooddetails (itemvalue,itemname, qty,empcode) VALUES ?";
pool.query(sql,postData, function(err) {
  if (err) throw err;
  conn.end();
});
});
 */







app.listen(port,()=>{ console.log(`server connected...${port}`); });

