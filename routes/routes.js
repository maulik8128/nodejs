const adminRoutes = require('./admin');
const shopRoutes = require('./shop');
const errorController = require('../controllers/error');

const routes = (app) => {
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(errorController.get404);
};

module.exports = routes;
