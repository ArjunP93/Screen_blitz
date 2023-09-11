import jwt from 'jsonwebtoken'
import {configKeys} from '../config/configKeys'

export const generateJWT = (payload:string) => {
    const jwtPayload = {unique_id:payload}
    if(configKeys.JWT_SECRET_KEY){
        return jwt.sign(jwtPayload,configKeys.JWT_SECRET_KEY,{ expiresIn:configKeys.JWT_EXPIRATION})
    }

    }

export const verifyJWT = (token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
        const result = jwt.verify(token,configKeys.JWT_SECRET_KEY)
        console.log('result in verify',result);
        return result
        
    }
}



    








