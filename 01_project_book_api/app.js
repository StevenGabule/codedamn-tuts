import {config} from 'dotenv'
import express from 'express';
import bodyParser from "body-parser";
import bookRoutes from './src/routes/book.routes'

config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/v1', (req, res) => {
    res.json({message: 'Welcome to the book api'});
})
app.use('/api/v1/books', bookRoutes)

const port = process.env.PORT || 8021;
app.listen(port, () => {
    console.log(`App is up and running on http://localhost:${port}`);
})
