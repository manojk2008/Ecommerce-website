import userModel from "../models/userModel.js"


// add products to cart
const addToCart = async (req,res) =>{
   try {
    const {userId, itemId, size} = req.body 
    console.log("userId:", userId)      // <- add this
        console.log("itemId:", itemId)      // <- add this
        console.log("size:", size) 

    const  userData = await userModel.findById(userId)
    console.log("userData:", userData)
    let cartData = await userData.cartData;
    console.log("cartData before:", cartData)


    if (cartData[itemId]) {
        if (cartData[itemId][size]){
            cartData[itemId][size] += 1
        }
        else {
            cartData[itemId][size] = 1
        }
    } else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1
    }

      await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
      console.log("cart saved!") 

      res.json({success: true, message: "Added to the cart"})

   } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message})
    
   }
}

// update user cart
const updateCart = async (req,res) =>{
    try {
        const {userId, itemId, size, quantity} = req.body

        const  userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

      res.json({success: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error);
    return res.json({success: false, message: error.message})
    }
}

//add get user cart
const getUserCart = async (req,res) =>{
    try {
        const {userId} = req.body


        const  userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success: true, cartData})
        
    } catch (error) {
        console.log(error);
    return res.json({success: false, message: error.message})
    }
}


export {addToCart, updateCart, getUserCart}