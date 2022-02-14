var express = require('express');
var app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) =>{

    res.render('../views/home');
});




app.listen(3000);
console.log("Server rodando... 3000.");