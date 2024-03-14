const personsRouter = require('express').Router();
const Person = require('../models/Person');

personsRouter.get('/', (req, res) => {
  Person.find({ })
    .then(person => {
      res.json(person);
    });
});

personsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findOne({ _id: id })
    .then(person => res.json(person))
    .catch(error => next(error));
});

personsRouter.post('/', (req, res, next) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ 
      error: 'body missing' 
    });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'need name and number'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });
  
  person.save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(error => next(error));
});

personsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
    
  const body = req.body;
  Person.findOneAndUpdate({ _id: id }, {name: body.name, number: body.number}, {new: true}) // new means the updated document is returned 
    .then(person => res.json(person))
    .catch(error => next(error));
});

personsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findOneAndDelete({ _id: id }) // new means the updated document is returned 
    .then(res.status(204).end())
    .catch(error => next(error));
});

personsRouter.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(result => {
      const time = new Date();
      let info = `<p>Phonebook has info for ${result} people</p><p>${time}</p>`;
      res.send(info);
    })
    .catch(error => next(error));
});

module.exports = personsRouter;