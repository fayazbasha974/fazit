const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/auth/findFriend', (req, res) => {
        User.find({
            $and: [
                { mobileNumber: req.body.mobileNumber },
                { mobileNumber: { $ne: req.user.mobileNumber } },
                { friends: { $ne: req.user.id } },
                { sentRequests: { $nin: [req.user.id] } }
            ]
        }, (err, docs) => {
            if (err) {
                res.json(err);
            } else {
                const user = docs[0];
                if (user.friendRequests.indexOf(req.user.id) >= 0) {
                    res.json({ msg: 'Already Sent' });
                } else {
                    res.json([{ displayName: user.displayName, mobileNumber: user.mobileNumber }]);
                }
            }
        });
    });
};