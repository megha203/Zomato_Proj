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
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        //check if email exists
        if(checkUserByEmail || checkUserByPhone){
            return res.json({email: "User alresdy exists!"});
        };

        //hash password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //save to database
        const newUser = await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        
        });

        //jwt token
        const token = jwt.sign({user: {fullName, email}}, "ZomatoAPP");

        return res.status(200).json({token,status:"Success"});

    } catch(e){
        return res.status(500).json({e: e.message})
    }
});

export default Router;