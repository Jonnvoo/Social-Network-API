const router = require('express').Router();
// Grabs our functions we created and adds them to a route
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}= require('../../controllers/thoughtsController')

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports= router;