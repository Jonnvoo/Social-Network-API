const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    deleteFriend,
    addFriend
} = require('../../controllers/userController')

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;