const User = require('../models/users');
const UserToken = require('../models/userTokens');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.login = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 1800 // 30 mins in seconds
          },
          (err, token) => {
            saveToken(user.id, token);
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};



exports.getIndex = async (req, res) => {
  const user = await User.find((data) => data);
  try {
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId, (user) => user);

  try {
    console.log(user);
    res.status(200).render('user', { user: user });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddUser = (req, res) => {
  res.status(200).render('edit-user', { editing: false });
};

exports.getEditUser = async (req, res) => {
  const userId = req.params.userId;

  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const user = await User.findById(userId);

  try {
    if (!userId) {
      return res.redirect('/');
    }
    console.log(user);
    res.status(200).render('edit-user', { user: user, editing: editMode });
  } catch (error) {
    console.log(error);
  }
};

exports.postUser = (req, res) => {
  const { name, image, description } = req.body;

  const user = new User({ name: name, image: image, description: description });
  user.save();
  console.log('User Added to the database');
  res.status(201).redirect('http://localhost:3000/');
};

exports.postEditUser = (req, res) => {
  const userId = req.body.userId;
  const { name, image, description } = req.body;

  User.findById(userId)
    .then((user) => {
      user.name = name;
      user.image = image;
      user.description = description;

      return user.save();
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
  const userId = req.body.model;
  await User.findByIdAndRemove(userId, (data) => data);
};

const saveToken = async (userId, token) => {
  await UserToken.findOneAndRemove({ userId: userId }, (data) => data);
  const userToken = new UserToken({ userId: userId, token: token });
  userToken.save();
}