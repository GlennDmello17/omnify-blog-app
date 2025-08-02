const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('successfully connected to db')
    }).catch((err)=>{console.log(err)}); 
}
module.exports = connectDB ;