module.exports = app => {
    const home = require('../controllers/home.controller')
    app.get('/', home.get);
}