const mongoose = require('mongoose');
const schema = mongoose.Schema({
    msg: {
        type: String
    },
    sender: {
        type: Number
    },
    reciever: {
        type: Number
    }
});

module.exports = (app, io, users) => {
    app.post('/auth/message', (req, res) => {
        const MessageCollection = getSchema(req);
        const message = {
            msg: req.body.message,
            sender: req.user.mobileNumber,
            reciever: req.body.mobileNumber
        };
        const Message = new MessageCollection(message);
        Message.save((err, docs) => {
            if (err) {
                res.json(err);
            } else {
                io.to(users[req.body.mobileNumber]).emit('msg', docs);
                res.json(docs);
            }
        });
    });

    app.post('/auth/message/chat', (req, res) => {
        const MessageCollection = getSchema(req);
        MessageCollection.find({}, (err, docs) => {
            if (err) {
                res.json(err);
            } else {
                res.json(docs);
            }
        });
    });

    function getSchema(req) {
        const userMobile = req.user.mobileNumber;
        const recieverMobile = req.body.mobileNumber;
        const mongooseSchema = userMobile < recieverMobile ? userMobile.toString() + recieverMobile.toString() : recieverMobile.toString() + userMobile.toString();
        return mongoose.model(mongooseSchema, schema);
    }

}