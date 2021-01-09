const Question = require('../models/questions');

exports.getIndex = async (req, res) => {
     await Question.find((data) => data).then((question)=>

     {
         //console.log(question);
        // res.status(200).render('index', { question: question });
        res.json(question);
    }). catch ((err) =>{
        console.log(err);
        res.status(401).send({error:err, message:'No FAQ selected.'});
    });
};

exports.getQuestion = async (req, res) => {
    const questionId = req.params.questionId;
    await Question.findById(questionId, (question) => question).then((question) =>{
        res.status(200).render('question', { question: question });
    }).catch ((err) => {
        console.log(err);
        res.status(401).send({error:err, message:'No FAQ selected.'});
    });
};

exports.getAddQuestion = (req, res) => {
    res.status(200).render('edit-question', { editing: false });
};

exports.getEditQuestion = async (req, res) => {
    const questionId = req.params.questionId;

    const editMode = req.query.edit;

    if (!editMode) {
        res.status(401).send({ message:'Invalid request.'})
  
    }

    if (!questionId) {
        res.status(401).send({ message:'No question selected.'})
    }

     await Question.findById(questionId).then((question)=>{
        
        res.status(200).send('edit-question', { question: question, editing: editMode });
    }).
    catch((err) => {
        res.status(401).send({error:err, message:'No FAQ updated.'});
    });
};

exports.postQuestion = (req, res) => {
   // console.log(req);
   try{
    const { question, answer, category } = req.body.model;

    const q = new Question({ question: question, category: category, answer: answer });
    q.save();
    console.log('FAQ add successfully');
   // res.status(200);
   res.status(201).send('FAQ added successfully.');
   }catch(err){
       res.status(401).send({error:err, message:'No FAQ added.'});
   }
};

exports.postEditQuestion = (req, res) => {
    const {_id, question, category, answer } = req.body.model;
    Question.findById(_id)
        .then((q) => {
            q.question = question;
            q.answer = answer;
            q.category = category;
            return q.save();
        })
        .then(() => {
            res.status(201).send({message:'FAQ updated successfully.'});
        })
        .catch((err) => {
            console.log(err);
            res.status(403).send({message:'Error : No FAQ updated.', error: err});
        });
};

exports.postDelete = async (req, res) => {
    const questionId = req.body.model;
    await Question.findByIdAndRemove(questionId, (data) => data).then((question)=>{
        console.log('Item Deleted');
        res.status(201).send({message:'FAQ deleted successfully.'});
    }).catch((err) => {
        console.log(err);
        res.status(403).send({message:'Error : No FAQ deleted.', error: err});
    });
};