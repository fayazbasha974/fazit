const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (app) {
    app.post('/auth/acceptRequest', (req, res) => {
        User.update(
            {
                _id: req.body.id
            },
            {
                $push: {
                    'friends': req.user.id
                },
                $pull: {
                    'sentRequests': req.body.id
                }
            },
            (err, docs) => {
                if (docs) {
                    User.update({
                        _id: req.user.id
                    },
                        {
                            $push: {
                                'friends': req.body.id
                            },
                            $pull: {
                                'friendRequests': req.body.id
                            }
                        }, (error, result) => {
                            if (result) {
                                res.json(result);
                            } else {
                                res.json(error);
                            }
                        })
                } else {
                    res.json({ error: err });
                }
            });
    });
};