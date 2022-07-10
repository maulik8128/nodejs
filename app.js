const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
const Router1 = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('62c974cc3b91d9970a1a6e31')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
Router1(app);

mongoose
  .connect('mongodb://localhost:27017/nodejs')
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'test',
          email: 'test@gmail.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log('connected!!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
