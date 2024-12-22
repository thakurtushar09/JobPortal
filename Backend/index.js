import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from '../Backend/Routes/user.route.js';
import companyRoute from '../Backend/Routes/company.route.js';
import jobRoute from '../Backend/Routes/job.route.js';
import applicationRoute from '../Backend/Routes/application.route.js'
dotenv.config();
const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions))

// const PORT = 3000;


//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/Application",applicationRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
