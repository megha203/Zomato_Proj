import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    fullName:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    address: [{details: {type: String}, for:{type: String}}],
    phoneNumber: {type: Number}

},{
    timestamps: true
});

//statics and methods

UserSchema.methods.generateJwtToken = function(){
    return jwt.sign({user: this._id.toString()},"ZomatoAPP");
};

UserSchema.statics.findByEmailAndPassword = async({email,password}) => {
    //check if email exists!
    const user = await UserModel.findOne({email});
    if(!user) throw new Error("User does not exists!!");

    //compare password
    const doesPasswordMatch = await bcrypt.compare(password,user.password);
    if(!doesPasswordMatch) throw new Error("Invalid Password!!");
    return user;
};
UserSchema.statics.findByEmailAndPhone = async({email, phoneNumber}) => {
    //check if email exists
    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});
    if(checkUserByEmail || checkUserByPhone){
        throw new Error("User already exists!");
    };
    return false;
};

UserSchema.pre("save",function(next){
    const user = this;
    //check for password
    if(!user.isModified("password"))  return next();
    //pswd bcryptSalt
    bcrypt.genSalt(8, (error,salt) => {
        if(error) return next(error);
        //hash pswd
        bcrypt.hash(user.password, salt, (error,hash) => {
            if(error) return next(error);
            //save hash pswd as pswd
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);
