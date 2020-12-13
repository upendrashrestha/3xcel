const Question = require('../models/questions');

exports.getIndex = async (req, res) => {
    const question = await Question.find((data) => data);

    try {
         console.log(question);
        // res.status(200).render('index', { question: question });
        res.json(question);
    } catch (error) {
        console.log(error);
    }
};

exports.getQuestion = async (req, res) => {
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId, (question) => question);
    try {
        console.log(question);
        res.status(200).render('question', { question: question });
    } catch (error) {
        console.log(error);
    }
};

exports.getAddQuestion = (req, res) => {
    res.status(200).render('edit-question', { editing: false });
};

exports.getEditQuestion = async (req, res) => {
    const questionId = req.params.questionId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const question = await Question.findById(questionId);

    try {
        if (!questionId) {
            return res.redirect('/');
        }
        console.log(question);
        res.status(200).render('edit-question', { question: question, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postQuestion = (req, res) => {
    console.log(req);
    const { question, answer, category } = req.body.model;

    const q = new Question({ question: question, category: category, answer: answer });
    q.save();
    console.log('Question Added to the database');
   // res.status(200);
   res.status(201).redirect('/');
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
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res) => {
    const questionId = req.body.model;
    const question = await Question.findByIdAndRemove(questionId, (data) => data);

    try {
        console.log(question);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};