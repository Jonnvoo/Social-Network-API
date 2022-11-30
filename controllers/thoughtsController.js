const { User, Thought } = require('../models')
// This exports our functions so that we can use them in our routes
module.exports = {
    // This grabs all the thoughts in the DB
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // This grabs a single thought from the ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Creates a new thought for the user
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true })

            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought has been deleted, no user found!" })
                    : res.json({ message: "Succefully deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));


    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.body } }, { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));


    },

};