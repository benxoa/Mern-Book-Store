const mongoose = require('mongoose');


const mybookSchema = new mongoose.Schema({
    Bookname: {
        type:String,
        required:true
    },
    Publisher: {
        type:String,
        required:true
    },
    Writer: {
        type:String,
        required:true
    },
    Price: {
        type:Number,
        required:true
    },
    Quantity: {
        type:Number,
        required:true
    },
    Image: {
        type:String,
        required:true
    },
    PublishedYear: {
        type:Number,
        required:true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MyBookUser',
        required: true
    }

})




const myBook = mongoose.model('MyBook', mybookSchema);

module.exports = myBook;