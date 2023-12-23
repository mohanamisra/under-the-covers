const mongoose = require('mongoose')
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery',false)
mongoose.connect(url)

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    rating: Number,
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Book', bookSchema);