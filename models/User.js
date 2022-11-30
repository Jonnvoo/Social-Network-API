const { Schema, model } = require('mongoose');


const usersSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            max_length: 50,
            unique: true,
            lowecase:true,
            // This is a email Regex to make sure the user puts in an valid email
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid Email']
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    },
    {
        toJSON:{
            virtuals: true,
    
        },
        id:false
    }
);
 
usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model ('user', usersSchema);

module.exports= User; 
