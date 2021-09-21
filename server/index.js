require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ConnectDB from './database/connection';

//Route
import auth from './API/auth/index';

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/",(req,res)=>{
    res.json({message: "Steup Successful!"})
});

zomato.use("/auth", auth);
zomato.listen(4000,()=>ConnectDB()
.then(()=>console.log("Server is up and running!"))
.catch(()=>console.log("Server is running but database connection failed!"))
);