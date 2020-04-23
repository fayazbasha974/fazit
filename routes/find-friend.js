const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/auth/findFriend', (req, res) => {
        User.find({
            $and: [
                { mobileNumber: req.body.mobileNumber },
                { mobileNumber: { $ne: req.user.mobileNumber } },
                { friends: { $ne: req.user.id } },
                { sentRequests: { $ne: req.user.id } }
            ]
        }, { mobileNumber: 1, displayName: 1 }, (err, docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        });
    });
};