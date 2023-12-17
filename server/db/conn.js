const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo Conneted!"))
.catch(()=> console.log("not conncetd!!"))