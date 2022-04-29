const express = require('express');
const app = express();
require("dotenv").config();

const frontEnd = require('./routes/frontEnd');
const clienteRouter = require("./routes/clienteRouter");
const adminRouter = require('./routes/adminRouter');
const methodOverride = require('method-override');
const autenticadorCliente = require('./middlewares/autenticadorCliente');
const autenticadorAdmin = require('./middlewares/autenticadorAdmin');
const loginRouter = require('./routes/loginRouter');

const logAllPet = require('./middlewares/log');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true 
}));


app.use(express.static("public"));
app.use('/', frontEnd);
app.use("/cliente", autenticadorCliente, clienteRouter);
app.use("/admin", autenticadorAdmin, adminRouter);
app.use('/', loginRouter);
app.use(logAllPet);













app.listen(4000);
console.log("Server rodando... 4000.");