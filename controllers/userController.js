const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    // Function to GET all users

    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                return res.json(users);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    },

    // Function to GET a single user by _id

    // Function to POST a new user

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }

    // Function to update a user with a PUT by _id

    // Function to DELETE a user by _id



};