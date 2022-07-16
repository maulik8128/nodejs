const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');

const routes = (app) => {
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(authRoutes);
  app.use(errorController.get404);
};

module.exports = routes;
