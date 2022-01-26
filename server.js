//Required packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

//initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
    secret: process.env.SECRET_SESSION,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    // Sets up session store
    store: new SequelizeStore({
        db: sequelize,
    }),
};

//middleware
app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//start server with sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(
            `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and have fun!`
        )
    );
});
