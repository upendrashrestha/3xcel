
const Model = require('../models/products');

exports.getIndex = async (req, res) => {
    const result = await Model.find((data) => data);

    try {
        // console.log(service);
        // res.status(200).render('index', { service: service });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

exports.getModel = async (req, res) => {
    const id = req.params.id;
    const result = await Model.findById(id, (res) => res);
    try {
        console.log(result);
        res.status(200).render('service', { result: result });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddModel = (req, res) => {
    res.status(200).render('edit-model', { editing: false });
};

exports.getEditModel = async (req, res) => {
    const id = req.params.id;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const result = await Model.findById(id);

    try {
        if (!id) {
            return res.redirect('/');
        }
        console.log(result);
        res.status(200).render('edit-service', { result: result, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postModel = (req, res) => {
    console.log(req);
    const { name, image, description, price } = req.body.model;

    const model = new Model({ name: name, image: image, description: description, price:price });
    model.save().then(()=>{
        console.log('Model Added to the database');
        res.status(200);
    }).catch(err=>console.log(err));
   
  //  res.status(201).redirect('http://localhost:3000/');
};

exports.postEditModel = (req, res) => {
    const id = req.body.id;
    const { name, image, description, price } = req.body;

    Model.findById(id)
        .then((service) => {
            service.name = name;
            service.image = image;
            service.description = description;

            return service.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res) => {
    const id = req.body.id;

    const result = await Model.findByIdAndRemove(id, (data) => data);

    try {
        console.log(result);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};