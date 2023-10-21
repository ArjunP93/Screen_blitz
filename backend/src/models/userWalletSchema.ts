import { Schema,model } from "mongoose";



const userWalletSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          balance: {
            type: Number,
            default:0,
          },
          transactions: {
            type: [Object],
            default: [],
          },
    }
    
)

const Wallet = model('Wallet',userWalletSchema)

export default Wallet