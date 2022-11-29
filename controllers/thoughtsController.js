const { User, Thought } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

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
        Thought.findOneAndUpdate({ _id: req.params.thought }, { $set: req.body }, { runValidators: true, New: True }
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