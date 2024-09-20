const mongoose = require('mongoose')


async function connectToDb(){
try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log('Success Connection to DB')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectToDb
