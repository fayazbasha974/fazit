const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/auth/rejectRequest', (req, res) => {
        User.update({
            _id: req.user.id
        }, {
                $pull: {
                    'friendRequests': req.body.id
                }
            }, (err, docs) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(docs);
                }
            })
    });
}