const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { extname } = require('path');
const flash = require('connect-flash')
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database }  = require('./keys')

// const { session } = require('passport');


// Inicializacion
const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, "views"));
app.engine('.hbs', exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), 'layouts'),
    partialsDir: path.join(app.get("views"), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Funciones de Peticiones

app.use(session({
    secret:'eliansesscion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Variables globales
app.use((req, res, next)=>{
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

//Rutas (Routes)
app.use(require('./routes/auth'));
app.use(require('./routes/index'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Arrancar servidor
app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));
})

