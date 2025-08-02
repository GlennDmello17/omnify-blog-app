const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title must be at most 50 characters'],
    },
    content:{
        type: String,
        maxlength: [5000, 'content must be at most 500 characters'],
    },
    published:{
        type: Boolean,
        default: false,
    },
    
    
})


const postModel= mongoose.model('Post',postSchema);
module.exports=postModel;