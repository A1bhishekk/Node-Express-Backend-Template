import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';

// import modules 
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/Error.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// configure dotenv
dotenv.config({ path: '.env'});
const port = process.env.PORT || 5000 ;

// connect to database
connectDB();


// configure middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

// configure routes
app.use('/api/v1/user', userRoutes);


// error errorMiddleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send(`<h1> 🐰 Welcome to Tech Abhi Job Portal 💓</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening in ${process.env.DEV_MODE} mode on http://localhost:${port}`.rainbow);
});