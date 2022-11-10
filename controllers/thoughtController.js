const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    // Function to GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                return res.json(thoughts);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    },

    // Function to GET a single thought by its _id

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(async (thought) => {
                !thought
                    ? res.status(404).json({ message: 'Invalid thought ID' })
                    : res.json(thought)
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Function to POST a new thought and add it to User's thoughts array field

    createThought(req, res) {
        const thoughtText = req.body.thoughtText;
        const username = req.body.username;
        const userId = req.body.userId;
        const newThought = { thoughtText, username };
        Thought.create(newThought)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
                    .then(() => res.json(thought))
            })
            .catch((err) => res.status(500).json(err));
    },

    // Function to update (PUT) a thought by its _id

    updateThought(req, res) {
        const updateText = req.body.thoughtText;
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: updateText } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Invalid thought ID' })
                    : res.json(thought)
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Function to DELETE a thought by its _id

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Invalid thought ID' })
                    : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },

    // Function to POST a reaction to a thought's reactions array field

    createReaction(req, res) {
        const reactionBody = req.body.reactionBody;
        const username = req.body.username;
        // const userId = req.body.userId;
        const thoughtId = req.params.thoughtId;
        const newReaction = { reactionBody, username };
        Thought.findOneAndUpdate(
            {_id: thoughtId},
            { $addToSet: { reactions: newReaction } },
            { runValidators: true, new: true }
            )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Invalid thought ID' })
                    : res.json(thought)
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Function to DELETE a reaction by the reaction's reactionId value

    deleteReaction(req, res) {
        const thoughtId = req.params.thoughtId;
        console.log(req.body.reactionId);
        Thought.findOneAndUpdate(
            {_id: thoughtId},
            { $pull: { reactions: {reactionId: req.body.reactionId}  } },
            { runValidators: true, new: true }
            )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Invalid thought ID' })
                    : res.json(thought)
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    }

}