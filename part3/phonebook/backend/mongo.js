const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as argument');
  process.exit(1);
}

const password =  process.argv[2];

const mongoUri = `mongodb+srv://tmo24:${password}@phonebook.u4lx8bh.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set('strictQuery', false);

mongoose.connect(mongoUri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: 'Me',
//     number: '13-59-60-18'
// })
  
// person.save().then(result => {
//     console.log('person saved!')
//     mongoose.connection.close()
// })

Person.find({ }).then(result => {
  console.log('phonebook:');
  result.forEach(person => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});