const express = require('express');
const bodyParser = require('body-parser');
const morgan=require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));

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
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const person = persons.find(person => person.id === id)
    res.json(person)
})

app.post('/api/persons', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 
            error: 'body missing' 
        })
    }

    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'need name and number'
        })
    }

    if (persons.map(person => person.name.toLowerCase()).includes(req.body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const randomId = Math.floor(Math.random() * 100000);
    const person = {name: req.body.name, number: req.body.number, id: randomId};
    
    persons = persons.concat(person);

    res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const time = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)