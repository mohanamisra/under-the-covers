const mongoose = require('mongoose')
const url = "mongodb+srv://mohanamisra:9903@underthecovers.nqvk0p1.mongodb.net/?retryWrites=true&w=majority";
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