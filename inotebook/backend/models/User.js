const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true     
    },
    email:{
        type: String,
        required: true,
        unique: true    
    },
    password:{
        type: String,
        required: true  
    },
    date:{
        type: Date,
        default: Date.now
    }
}
);   

const User = mongoose.model('user', UserSchema);
// User.createIndexes -->  To avoid duplicate entries in our database--> we are removing this and will write our logic in auth.js for this

module.exports = User