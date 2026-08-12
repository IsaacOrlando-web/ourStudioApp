const express = require('express')
const morgan = require('morgan')
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { connectDB } = require('./db/index');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

require('dotenv').config({ path: './.env' });

const app = express();
const port = process.env.PORT;

// CORS configuración
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true }));
//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/script'));

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

// Rutas de autenticación (OAuth en raíz, sin /api prefix)
app.use(authRouter);

// Rutas API
app.use('/api', indexRouter);

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en puerto ${port}`)
})