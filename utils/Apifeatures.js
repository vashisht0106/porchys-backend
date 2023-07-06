
class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
        ? {
           $or:[ {name:{ $regex: this.queryStr.keyword,
                            $options:"i" }},
                  
           { description:{$regex:this.queryStr.keyword,
                               $options:"i" }  
                             }
                
           ]

 }
               
       
       
            : {};
            
        this.query = this.query.find({ ...keyword })
        return this;
        
    }


    
    filter(){

const queryCopy={...this.queryStr}
//removeField
const removeField=["keyword","page","limit"];
removeField.forEach((key)=>delete queryCopy[key] )
this.query=this.query.find(queryCopy)

    
   
//filter price
  console.log('quercopy',queryCopy)
let queryStr = JSON.stringify(queryCopy);
//queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

this.query = this.query.find(JSON.parse(queryStr));
console.log("parse",JSON.parse(queryStr))
return this;
    }
    pagination(limit){
 const currentpage=Number(this.queryStr.page)||1
 const skipitem=limit*(currentpage-1)
this.query=this.query.limit(limit).skip(skipitem);
return this;



    }
}

module.exports = Apifeatures

