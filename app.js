const express = require('express');
const app = express();
const frontEnd = require('./routes/frontend');

app.set('view engine', 'ejs');


app.use(express.static("public"));

app.use('/', frontEnd);




app.listen(4000);
console.log("Server rodando... 4000.");