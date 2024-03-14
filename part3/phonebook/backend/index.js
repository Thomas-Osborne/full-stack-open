require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan=require('morgan');

const app = express();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

app.use(express.static('dist'));
app.use(bodyParser.json());

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

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findOne({ _id: id })
        .then(person => res.json(person));
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
  
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })

    res.json(person);
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    
    const body = req.body;
    Person.findOneAndUpdate({ _id: id }, {name: body.name, number: body.number})
        .then(person => res.json(person))
        .catch(err => res.status(500).json({ error: err.message}));
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const time = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)