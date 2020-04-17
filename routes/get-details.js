const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    app.get('/auth/getDetails', (req, res) => {
        User.find({_id: req.user.id}).populate('friends', ['displayName', 'mobileNumber']).populate('friendRequests', ['displayName', 'mobileNumber']).exec((err, docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs[0]);
            }
        });
    });
}
