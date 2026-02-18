const express = require('express')
const morgan = require('morgan')
const session = require('express-session');
const passport = require('passport');
const { connectDB } = require('./db/index');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

require('dotenv').config({ path: './.env' });

const app = express();
const port = process.env.PORT;

app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));
// Conectar a MongoDB
connectDB().then(() => {
  console.log('✅ MongoDB conectado');
}).catch(console.error);
// Solo lo esencial para sesiones
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})