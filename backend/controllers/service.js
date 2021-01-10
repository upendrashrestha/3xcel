
const Model = require('../models/services');

const item = 'Service';

exports.getIndex = async (req, res) => {
    await Model.find((data) => data).then((result) => {
        res.json(result);
    }).catch((err) => {
        //console.log(err);
        res.status(401).send({ error: err, message: `No ${item} Selected.` });
    });
};

exports.getService = async (req, res) => {
    const id = req.params.id;
    const result = await Model.findById(id, (res) => res);
    try {
       // console.log(result);
        res.status(200).send({ result: result });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddService = (req, res) => {
    res.status(200).render('edit', { editing: false });
};

exports.getEditService = async (req, res) => {
    const id = req.params.id;
    const editMode = req.query.edit;
    if (!editMode) {
        res.status(401).send({ message: `No ${item} Selected.` })
    }
    if (!id) {
        res.status(401).send({ message: `No ${item} Selected.` })
    }
    await Model.findById(id).then((result) => {
        res.status(200).render('edit', { result: result, editing: editMode });
    }).catch((err) => {
        res.status(403).send({ message: `No ${item} Selected.`, error: err });
    });
};

exports.postService = (req, res) => {
    //console.log('server model',req.body.model);
  
    const { name, image, description, price } = req.body.model;
    const model = new Model({ name: name, image: image, description: description, price: price });
    model.save().then(() => {
        res.status(200).send({ message: `${item} added successfully.` });;
    }).catch(err => {
        console.log(err);
        res.status(403).send({ message: `No ${item} Added.`, error: err });
    });
};

exports.postEditService = (req, res) => {
  //  const id = req.body.id;
    const {_id, name, image, description, price } = req.body.model;

    Model.findById(_id)
        .then((item) => {
            item.name = name;
            item.image = image;
            item.description = description;
item.price= price;
            return item.save();
        })
        .then(() => {
            res.status(201).send({ message: `${item} updated successfully.` });
        })
        .catch((err) => {
            res.status(403).send({ message: `No ${item} updated.`, error: err });
        });
};



exports.postDelete = async (req, res) => {
    const id = req.body.model;
    await Model.findByIdAndRemove(id, (data) => data).then((product)=>{
       // console.log('Item Deleted');
        res.status(201).send({message:`${item} deleted.`});
    }).catch((err) => {
        //console.log(err);
        res.status(403).send({message:`No ${item} deleted.`, error: err});
    });
};