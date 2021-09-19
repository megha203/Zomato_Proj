import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
    menus: [
        {
            name: {type: String, required: true},
            items: {type: mongoose.Types.ObjectId, ref:'FOods'}
        },
       
    ],
    recommended: [{type: mongoose.Types.ObjectId, ref:'Foods', unique:true}]
},{
    timestamps: true
});

export const MenuModel = mongoose.Model("Menus", FoodSchema);