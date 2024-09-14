const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');
//post method to add a Menu Item
router.post('/',async(req,res) =>{
    try{
        const data = req.body //Assuming the request body contains the person data
    //create a new Person document using the Mongoose model
    const newMenu =new MenuItem(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
        }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})
//Get method to get the person
router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){

        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})
router.get('/:tasteType', async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;////extract the work type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'spicy'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid taste type'});
        }
    }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});

        }
    })
    router.put('/:id', async (req, res) => {
        try {
            const menuItemId = req.params.id; // extract the id from the URL parameter
            const updatedMenuItemData = req.body; // data from the request body
            
            const response = await MenuItem.findByIdAndUpdate(
                menuItemId,
                updatedMenuItemData,
                {
                    new: true, // Return the updated document
                    runValidators: true, // Ensure mongoose validation runs
                }
            );
            
            if (!response) {
                return res.status(404).json({ error: 'Menu item not found' });
            }
            
            console.log('Data updated');
            res.status(200).json(response);
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    router.delete('/:id',async(req,res)=>{
        try{
            const menuItemId = req.params.id; //extract the id from the URL parameter

            const response= await MenuItem.findByIdAndDelete(menuItemId);
            console.log('data delete');
            res.status(200).json({message:'menu deleted sussefully'});
        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
        }
  })
module.exports = router;