import UserModel from "../Models/User.js";


// Update User Cart Data - /api/cart/update
export const updateCart = async (req,res) => {
    try {
        const {userId,cartItems} = req.body;
        await UserModel.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true, message:"Cart Updated"})
    } catch (err) {
        console.log(err.message);
        
        res.json({success:false, message:err.message})
    }
}