const { Schema, model, Types} = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
      reactionId: {
        type: Types.ObjectId,
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

const thoughtsSchema= new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        reactions: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;
