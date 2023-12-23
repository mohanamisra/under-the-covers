const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Book = require('./models/book')

morgan.token('type', function(req) {
    if(req.body)
        return JSON.stringify(req.body);
    else
        return '';
});
morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.type(req, res)
    ].join(' ');
});

const app = express();

app.use(express.json());
// used for post() because we send the data to be posted in json format, and this is express' built-in json parser.
app.use(cors());
// used to allow cross-origin requests because frontend and backend are often being hosted on separate ports
// especially during development
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.type(req, res)
    ].join(' ');
}));
// used to format the backend console.logs and provide readable and understandable feedback. Easy debugging.

app.get('/api/books', (request, response) => {
    Book.find({}).then(books => {
        response.json(books);
    });
});

app.post('/api/books', (request, response) => {
    const body = request.body;
    if(!body.title || !body.author) {
        return response.status(400).json({error: 'Book title or author name missing'});
    }
    else if(body.rating < 0 || body.rating > 5) {
        return response.status(400).json({error: 'Rating should be between 0 to 5'});
    }
    else if(body.pages < 0) {
        return response.status(400).json({error: 'Pages cannot be less than 0'});
    }

    const book = new Book({
        title: body.title,
        author: body.author,
        pages: body.pages,
        rating: body.rating,
    });

    book.save().then(savedBook => {
        response.json(savedBook);
    });
});

app.delete('/api/books/:id', (request, response) => {
    Book.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end();
        })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server running successfully!\n VISIT AT http://localhost:3001/api/books')
});