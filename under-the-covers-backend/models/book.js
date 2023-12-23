const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://lordmagic:${password}@cluster0.z6jhhex.mongodb.net/?retryWrites=true&w=majority`
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