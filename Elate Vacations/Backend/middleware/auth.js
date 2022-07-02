import  jwt  from "jsonwebtoken";
import UserModel from '../models/user.js'


const secret_key = "testkey";

const auth = async (req, res, next)=>{
    try {
        // const token = req.headers.Authorization.split(" ")[1];
        // const isCustomAuth = token.length < 500;  // means user is looged in using normal email and password as we will be using google sign in as well and the length of authtoken for that is more than 500
        // let decodedData
        // if(token && isCustomAuth){
        //     decodedData = jwt.verify(token, secret_key);
        //     req.userId = decodedData?.id;
        // }
        // else{
        //     decodedData = jwt.decode(token); // token is automaticaaly generated in case of google signin
        //     const googleId = decodedData?.sub.toString();
        //     const user = await UserModel.findOne(googleId);
        //     req.userId = user._id;
        // }
        const token = req.headers.authorization.split(" ")[1];
        if(token){
                const decodedData = jwt.verify(token, secret_key);
                req.userId = decodedData?.id;
                next();
        }
        
        
    } catch (error) {
      console.log(error);  
    }
}

export default auth;