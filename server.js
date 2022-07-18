const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require('./utils/helpers');
const authenticated  = require('./utils/authentication');
const routes = require('./controllers');
const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//handlebars
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Session Create
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

const init = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Now listening PORT: ${PORT}`)
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

init();