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
                    User.update({ mobileNumber: req.user.mobileNumber }, {
                        $push: {
                            'sentRequests': req.body._id
                        }
                    }, (error, result) => {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json(result);
                        }
                    });
                } else {
                    res.json({error: err});
                }
        });
    });
};