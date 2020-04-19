const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/signup', async (req, res) => {
        User.find({ mobileNumber: req.body.mobileNumber }, (err, users) => {
            if (err) {
                res.status(500).json('error');
            } else if (users.length) {
                res.status(400).json({ msg: 'User Already Exists' });
            } else {
                const user = new User(
                    req.body
                );
                user.save((err, doc) => {
                    if (err) {
                        res.json({ 'error': err });
                    } else {
                        res.status(200).json({ msg: 'User Succesfully Created' });
                    }
                });
            }
        });
    });
};