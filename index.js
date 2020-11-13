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
      pool.query('INSERT INTO fooddetails SET ?', postData,function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.end(JSON.stringify(result));
      });
});











app.listen(port,()=>{ console.log(`server connected...${port}`); });

