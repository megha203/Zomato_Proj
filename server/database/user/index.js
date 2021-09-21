import mongoose from 'mongoose';

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
UserSchema.statics.findByEmailAndPhone = async({email, phoneNumber}) => {
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            throw new Error("User already exists!!");
        };

        return false;
};

export const UserModel = mongoose.model("Users", UserSchema);
