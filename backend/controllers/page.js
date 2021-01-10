
const Model = require('../models/pages');

const item = 'Page';

exports.getIndex = async (req, res) => {
    await Model.find((data) => data).then((result) => {
        res.json(result);
    }).catch((err) => {
        //console.log(err);
        res.status(401).send({ error: err, message: `No ${item} Selected.` });
    });
};

exports.getModel = async (req, res) => {
    const id = req.params.id;
    const result = await Model.findById(id, (res) => res);
    try {
        // console.log(result);
        res.status(200).send({ result: result });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddModel = (req, res) => {
    res.status(200).render('edit', { editing: false });
};

exports.getEditModel = async (req, res) => {
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

exports.getModelByCode = async(req, res)=>{
    
    const cd = req.params.code;
    console.log(cd, "CODEE");
    if (cd==='') {
        res.status(401).send({ message: `No ${item} Selected.` })
    }

     Model.findOne({'pageCode' : cd}).then((result)=>{
        //console.log('RESULL',result)
        res.status(200).send({result});
       }).catch(err=>{
            res.status(404).send({message:'Page Not Found!'});
        });
};

exports.postModel = (req, res) => {
    //console.log('server model',req.body.model);

    const { title, metaDescription, keywords, content, displayPosition, pageCode } = req.body.model;
    const model = new Model({
        title: title,
        metaDescription: metaDescription,
        keywords: keywords,
        content: content,
        displayPosition: displayPosition,
        pageCode:pageCode
    });
    model.save().then(() => {
        res.status(200).send({ message: `${item} added successfully.` });;
    }).catch(err => {
        console.log(err);
        res.status(403).send({ message: `No ${item} Added.`, error: err });
    });
};

exports.postEditModel = (req, res) => {
    //  const id = req.body.id;
    const { _id, title, content, metaDescription, keywords, displayPosition, pageCode } = req.body.model;

    Model.findById(_id)
        .then((item) => {
            item.title = title;
            item.content = content;
            item.metaDescription = metaDescription;
            item.keywords = keywords;
            item.displayPosition = displayPosition;
            item.pageCode = pageCode;
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
    await Model.findByIdAndRemove(id, (data) => data).then((product) => {
        // console.log('Item Deleted');
        res.status(201).send({ message: `${item} deleted.` });
    }).catch((err) => {
        //console.log(err);
        res.status(403).send({ message: `No ${item} deleted.`, error: err });
    });
};