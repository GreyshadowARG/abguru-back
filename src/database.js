import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log("DB conectada:",db.connection.name))
    .catch(error => console.log(error))
