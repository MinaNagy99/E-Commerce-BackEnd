export class ApiFeature {

    constructor(mongoseQuery,queryString){
        this.mongoseQuery= mongoseQuery,
        this.queryString=queryString
    }

    paginate(){
        const page = this.queryString.page*1 ||1
        if (page <=0) {
            page = 1
        }
        this.page=page
        const skip = (page-1)*5
        this.mongoseQuery.skip(skip).limit(5)
        return this
    }


    filter(){
    let filterobj = {...this.queryString}
    const excludeQuary = ['page','sort','fields','keyword']
    excludeQuary.forEach((q)=>{
        delete filterobj[q]
    })
     filterobj= JSON.stringify(filterobj)
     filterobj =filterobj.replace(/\b(gt|gte|lt|lte)\b/g,math=>`$${math}`)
     filterobj = JSON.parse(filterobj)
    this.mongoseQuery.find(filterobj)

    return this
 
}
    sort(){


        if (this.queryString.sort) {
           let sortedBy = this.queryString.sort.split(',').join(' ')
            console.log(sortedBy);
           this.mongooseQuery.sort(sortedBy)

        }
        return this

    }

    search(){

        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or:[
                    {title:{$regex:this.queryString.keyword,$options:'i'}},
                    {description:{$regex:this.queryString.keyword,$options:'i'}}
                ]
            })
        }
        return this 
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this

    }
}