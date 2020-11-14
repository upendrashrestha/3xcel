const Service = require('../models/services');

exports.getIndex = async (req, res) => {
    const service = await Service.find((data) => data);

    try {
        // console.log(service);
        // res.status(200).render('index', { service: service });
        res.json(service);
    } catch (error) {
        console.log(error);
    }
};

exports.getService = async (req, res) => {
    const serviceId = req.params.serviceId;
    const service = await Service.findById(serviceId, (service) => service);
    try {
        console.log(service);
        res.status(200).render('service', { service: service });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddService = (req, res) => {
    res.status(200).render('edit-service', { editing: false });
};

exports.getEditService = async (req, res) => {
    const serviceId = req.params.serviceId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const service = await Service.findById(serviceId);

    try {
        if (!serviceId) {
            return res.redirect('/');
        }
        console.log(service);
        res.status(200).render('edit-service', { service: service, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postService = (req, res) => {
    console.log(req);
    const { name, image, description } = req.body.model;

    const service = new Service({ name: name, image: image, description: description });
    service.save();
    console.log('Service Added to the database');
    res.status(200);
  //  res.status(201).redirect('http://localhost:3000/');
};

exports.postEditService = (req, res) => {
    const {_id, name, image, description } = req.body.model;
    Service.findById(_id)
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
    const serviceId = req.body.model;
    const service = await Service.findByIdAndRemove(serviceId, (data) => data);

    try {
        console.log(service);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};