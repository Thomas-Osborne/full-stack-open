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

app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then(result => {
            const time = new Date();
            let info = `<p>Phonebook has info for ${result} people</p><p>${time}</p>`
            res.send(info)
        })
        .catch(error => next(error));
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