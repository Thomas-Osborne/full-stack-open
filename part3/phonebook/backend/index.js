require('dotenv').config();

const express = require('express');
const morgan=require('morgan');

const app = express();

const Person = require('./models/Person');

app.use(express.static('dist'));
app.use(express.json());

const cors = require('cors')
app.use(cors())

app.use(morgan('tiny'));
morgan.token('object', (req, res) => `${JSON.stringify(req.body)}`);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :object'))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/persons', (req, res) => {
    Person.find({ })
        .then(person => {
            res.json(person);
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findOne({ _id: id })
        .then(person => res.json(person))
        .catch(error => next(error));
})

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ 
            error: 'body missing' 
        })
    }

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'need name and number'
        })
    }

    if (persons.map(person => person.name.toLowerCase()).includes(body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
  
    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    
    const body = req.body;
    Person.findOneAndUpdate({ _id: id }, {name: body.name, number: body.number}, {new: true}) // new means the updated document is returned 
        .then(person => res.json(person))
        .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Person.findOneAndDelete({ _id: id }) // new means the updated document is returned 
        .then(result => res.status(204).end())
        .catch(error => next(error));
})

app.get('/info', (req, res) => {
    const time = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)