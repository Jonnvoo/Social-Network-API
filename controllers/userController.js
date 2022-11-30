const { User, Thought } = require("../models");
// This exports our functions so that we can use them in our routes.
module.exports = {
    //Grabs a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "user not found with this ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));


    },
    // This grabs all the users in the DB
    getUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));

    },
    // This Creates a new user to add to the DB
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log((err))
                return res.status(500).json(err);
            });
    },
    // This deletes the user and
    deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) =>
                !user
                    ?res.status(404).json({message: "No User found with that ID!"})
                    : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(()=> res.json({nessage: "User and all their thoughts have been successfully deleted!"}))
            .catch((err)=> res.status(500).json(err)); 
        
    },
    //This updates a current user
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body},{runValidators: true, new: true})
            .then((user) =>
                !user
                    ?res.status(404).json({message: "There are no Users found with this ID!"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },
    // This will remove a friend associated with the user
    deleteFriend(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$pull:{friends: req.params.friendId}},{new: true})
        .then((user) =>
                !user
                    ?res.status(404).json({message: "There are no Users found with this ID!"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));

        

    },
    // This will add a friend to the user
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