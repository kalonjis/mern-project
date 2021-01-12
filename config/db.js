const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://Steph:mernproject@cluster0.iom6z.mongodb.net/mern-project',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
.then(()=> console.log('Connected to MongoDB'))
.catch( (err) => console.log('Failed to connect to MongoDB: error ' + err));