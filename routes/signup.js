const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    app.post('/signup', async (req, res) => {
        const user = new User(
            req.body
        );
        user.save((err, doc) => {
            if (err) {
                res.json({'error': err});
            } else {
                res.status(200).json({ 'docs': doc });
            }
        })
    });
};