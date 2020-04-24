const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/auth/findFriend', (req, res) => {
        User.find({
            $and: [
                { mobileNumber: req.body.mobileNumber }, //8
                { mobileNumber: { $ne: req.user.mobileNumber } }, //9
                { friends: { $ne: req.user.id } }, //9
                // { sentRequests: { $nin: [req.user.id] } }
            ]
        }, (err, docs) => {
            if (err) {
                res.json(err);
            } else {
                const user = docs[0];
                if (user && (user.friendRequests.indexOf(req.user.id) >= 0 || user.sentRequests.indexOf(req.user.id) >= 0)) {
                    res.json({ msg: user.friendRequests.indexOf(req.user.id) >= 0 ? 'Already Sent' : 'Check your invites' });
                } else {
                    const result = user ? [{ displayName: user.displayName, mobileNumber: user.mobileNumber }] : [];
                    res.json(result);
                }
            }
        });
    });
};