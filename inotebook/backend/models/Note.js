const mongoose = require('mongoose');
const {Schema} = mongoose;


const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  // This is done so that no user can use the notes of other users
        ref: 'user'      // This reference is of user database used as foreign key
    },

    title:{
        type: String,
        required: true     
    },
    description:{
        type: String,
        required: true,
           
    },
    tag:{
        type: String,
        default: "General"
         
    },
    date:{
        type: Date,
        default: Date.now
    }
}
);

module.exports = mongoose.model('notes', NotesSchema);