const express = require('express');
const app = express();
require("dotenv").config();
const frontEnd = require('./routes/frontend');
const clienteRouter = require("./routes/clienteRouter");
const methodOverride = require('method-override');


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use('/', frontEnd);
app.use("/cliente", clienteRouter);
app.use(methodOverride("_method"));






app.listen(4000);
console.log("Server rodando... 4000.");