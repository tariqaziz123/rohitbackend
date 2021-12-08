const { response } = require('express');
const restaurants = require('../Modules/restaurants')

exports.filteredRestaurants=(req,res)=>{


let filterPayload = {};

    const reqBody = req.body;
    const location = reqBody.location;
    const mealtype = reqBody.mealtype;
    const cuisine = reqBody.cuisine;
    const lcost = reqBody.lcost;
    const hcost = reqBody.hcost;
    const sort = reqBody.sort ? reqBody.sort: 1 ;    
    const page = reqBody.page ? reqBody.page : 1;
    
    const countPerPage = reqBody.countPerPage? reqBody.countPerPage: 3;
    const startIndex = (page * countPerPage)-countPerPage;
    const endIndex = (page * countPerPage );


// const startIndex = iteamPerPage * page -iteamPerPage;
// const endIndex = iteamPerPage * page;

if(mealtype){
    filterPayload={
        mealtype_id:mealtype
    }
}
if(mealtype && location){
    filterPayload={
        mealtype_id:mealtype,
        location_id:location
    }
}
if(mealtype && cuisine){
    filterPayload={
        mealtype_id: mealtype,
        cuisine_id: {$in: cuisine}
    }
}
if(mealtype && lcost && hcost){
    filterPayload={
        mealtype_id:mealtype,
        min_price:{$lte:hcost,$gte:lcost}
    }
}
if(mealtype && location && cuisine){
    filterPayload={
        mealtype_id:mealtype,
        location_id:location,
        cuisine_id:{$in: cuisine},
    }
}
if(mealtype && location && lcost && hcost){
    filterPayload={
        mealtype_id:mealtype,
        location_id:location,
        min_price:{$lte:hcost,$gte:lcost}
    }
}
if(mealtype && cuisine && lcost && hcost){
    filterPayload={
        mealtype_id:mealtype,
        cuisine_id:{$in: cuisine},
        min_price:{$lte:hcost,$gte:lcost}
    }
}
if(mealtype && location && cuisine && lcost && hcost){
    filterPayload={
        mealtype_id:mealtype,
        location_id:location,
        cuisine_id:{$in: cuisine},
        min_price:{$lte:hcost,$gte:lcost}
    }
}

restaurants.find(filterPayload).sort({ min_price : sort})
.then(
    response =>{
        const count = Math.ceil(response.length / 5);
        const pageCountArr = []; 
        const filterResponse = response.slice(startIndex, endIndex);  // to return paginated items        
         for (var i = 1; i <= count; i++) {         
                 pageCountArr.push(i);      
              } 
        res.status(200).json({msg:"sucessfully feched  filter ",restaurants:filterResponse, pageCount: pageCountArr, totalCount: response.length
    })

        // const filterResponse=response.slice(startIndex,endIndex)
        // 
    }
).catch( err => {res.status(500).json({error:err})})
}


// page=1
// itemPage=2
// startIndex=0
// endIndex=1

exports.getRestaurantsByLocations=(req,res)=>{
    const {locationId} = req.params;
    restaurants.find({location_id:locationId})
    .then(
        response =>{
            res.status(200).json({msg:"succesfully feched Restaurents",Restaurents:response})
        }
    )
    .catch(
        err => res.status(500).json({error:err})
    )
}

exports.getRestaurantDetailsById=(req,res)=>{
    const {resId}=req.params;
    restaurants.findById(resId)
    .then(
        response =>{
            res.status(200).json({msg:"succesfully feched restaurent Details",restaurant:response});
        }
    )
    .catch(
        err => res.status(500).json({error:err})
    )
}