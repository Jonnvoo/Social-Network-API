const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const usersSchema = new Schema(
    {
        username: {
            type: Strong, 
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Friend',
        },
    ],
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id:false
    }
);
 
usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model ('users', usersSchema);

module.exports= User; 
