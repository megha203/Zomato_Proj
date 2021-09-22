import express from 'express'

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
        
        await UserModel.findByEmailAndPhone(req.body.credentials);

        const newUser = await UserModel.create(req.body.credentials);

        //jwt token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token,status:"Success"});

    } catch(e){
        return res.status(500).json({e: e.message})
    }
});

export default Router;