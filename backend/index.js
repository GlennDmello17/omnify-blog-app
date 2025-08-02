const express = require('express')
const connectDB = require ('./config/db.js')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes.js')
const blogRoutes = require('./routes/blogRoutes')


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://omnify-blog-app-frontend.vercel.app', // ← replace this
  credentials: true}));
const port = process.env.PORT;
connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);    

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})