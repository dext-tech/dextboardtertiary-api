module.exports = app => {
    app.get('/', (req, res) => {
        return res.send('Welcome to dextboard-t server');
    });
}