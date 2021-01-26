
const Model = require('../models/scores');

const item = 'Score';

exports.getIndex = async (req, res) => {
    await Model.find((data) => data).limit(5).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(401).send({ error: err, message: `No ${item} Selected.` });
    });
};

exports.postModel = (req, res) => {
    const { name, time } = req.body.model;
    Model.findOne({ name: name.toUpperCase() }).then(
        (item) => {
            if (time < item.time) {
                item.time = time;
                item.save();
                res.status(200).send({ item });
            }
        }).catch(err => {
            const model = new Model({
                name: name.toUpperCase(),
                time: time
            });
            model.save().then(() => {
                res.status(200).send({ message: `${item} added successfully.` });;
            }).catch(err => {
                console.log(err);
                res.status(403).send({ message: `No ${item} Added.`, error: err });
            });
        });
};
