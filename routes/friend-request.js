const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    app.post('/auth/friendRequest', (req, res) => {
        User.update(
            { 
                mobileNumber: req.body.mobileNumber
            },
            {
                $push: {
                    'friendRequests': req.user.id
                }
            }, (err, docs) => {
                if (docs) {
                    res.json({message: 'updated'});
                } else {
                    res.json({error: err});
                }
        });
    });
};