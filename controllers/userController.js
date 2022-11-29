const { User, Thought } = require("../models");

module.exports = {
    getSingleUser(req, res) {
        User.findone({ _id: req.params.userId })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "user not found with this ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));


    },

    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));

    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log((err))
                return res.status(500).json(err);
            });
    },
    deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) =>
                !user
                    ?res.status(404).json({message: "No User found with that ID!"})
                    : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(()=> res.json({nessage: "User and all their thoughts have been succefully deleted!"}))
            .catch((err)=> res.status(500).json(err)); 
        
    },

    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body},{runValidators: true, new: true})
            .then((user) =>
                !user
                    ?res.status(404).json({message: "There are no Users found with this ID!"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    deleteFriend(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$pull:{friends: req.params.friendId}},{new: true})
        .then((user) =>
                !user
                    ?res.status(404).json({message: "There are no Users found with this ID!"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

        

    },
    addFriend(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet:{friends: req.params.friendId}},{runValidators: true, new: true})
        .then((user) =>
                !user
                    ?res.status(404).json({message: "There are no Users found with this ID!"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

};