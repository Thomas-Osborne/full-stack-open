const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(result => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB'));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: String,
})

module.exports = mongoose.model('Person', personSchema);