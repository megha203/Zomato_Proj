import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {UserModel} from '../../database/user/index';

const Router = express.Router();

/*
Route           auth/signup
Desc            Register a new User
Params          None
Access          Public
Method          POST
*/
Router.post("/signup" , async(req,res)=>{
    try{
        const {email, password, fullName, phoneNumber} = req.body.credentials;

        await UserModel.findByEmailAndNumber(req.body.credentials);

        //save to database
        const newUser = await UserModel.create(...req.body.credentials);

        //jwt token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token,status:"Success"});

    } catch(e){
        return res.status(500).json({error: error.message})
    }
});

export default Router;