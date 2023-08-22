//autharization logedin user can do things than non logedin users

import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    try{
        let token = req.header("Authorization"); //from the frontend grab the authorization header

        if(!token){
            return res.status(403).send("Access Denied");
        }

        //token will be placed after a space in the bear
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();//this function proceed to the next step of the function
    }catch(e){
        res.status(500).json({error: e.message});
    }
}