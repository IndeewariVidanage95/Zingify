import bcrypt from "bcrypt";
import jws from "jsonwebtoken";
import User from "../models/User.js"

//register user

//create register function
export const register = async (request, response) => {
    try{
        //object for request body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = request.body;

        //encript password using salt and hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),//to give dummy values user random numbering
            impression: Math.floor(Math.random()*10000)
        });

        const savedUser = await newUser.save();
        response.status(201).json(savedUser);

    }catch(e){
        response.status(500).json({error: e.message});
    }
}

//create login function (done authentication - done things for security)
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });//use mongoose to find specified email then bring back user details to this user variable
        if(!user) return res.status(400).json({
            message: "User does not exist."
        });

        const isMatch = await bcrypt.compare(password, user.password);//compare the mongoos user with client inputted detail 
        if(!isMatch) return res.status(400).json({
            message: "Invalid Credentials."
        });

        const token = jws.sign({id: user._id}, process.env.JWT_SECRET);//write secret message in .env file
        delete user.password;
        res.status(200).json({token, user});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}



