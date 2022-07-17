const router = require('express').Router();

const dashboardRoutes = require('./home-routes/dashboard-routes');
const homeRoutes = require('./home-routes/home-routes');
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});
module.exports = router;