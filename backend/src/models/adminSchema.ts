import { Schema,model} from "mongoose";



const adminSchema =new Schema( {
    name :{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6    }
}
)

const Admin = model('Admin',adminSchema)
export default Admin