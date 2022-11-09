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

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(async (user) => {
                !user
                    ? res.status(404).json({ message: 'Invalid user ID' })
                    : res.json(user)
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Function to POST a new user

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Function to update a user with a PUT by _id

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'Invalid user ID' })
                    : res.json(user)
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Function to DELETE a user by _id - optional remove associated thoughts

    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            // const thoughtArray = user.thoughts.map((a) => a.toString());
            !user
            ? res.status(404).json({message: 'Invalid user ID'})
            :  Thought.deleteMany({_id: {$in: user.thoughts}})
        })
        .then(() => { res.json({message: 'User and thoughts deleted'})})
        .catch((err) => res.status(500).json(err));
    },

    // Function to POST a new friend to friends list

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true }
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'Invalid user ID'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    // Function to DELETE a friend from friend's list

    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            { runValidators: true, new: true }
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'Invalid user ID'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    }
};