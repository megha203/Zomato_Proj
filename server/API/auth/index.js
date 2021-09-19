import express from 'express';

import {UserModel} from '../../database/user/index';

const Router = express.Router();

/*
Route           /signup
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

        if(checkUserByEmail || checkUserByPhone){
            return res.json({email: "User already exists!"});
        };
        
    } catch(e){
        return res.status(500).json({error: error.message})
    }
});