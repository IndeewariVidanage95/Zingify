import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors  from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users, posts} from "./data/index.js"

// midleware configurations
const __filename = fileURLToPath(import.meta.url);//grab the file url 
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))//set the directory are where we keep assets

// setup file storage configuration
const storage = multer.diskStorage({
    //when upload images get them and upload to this public/assets 
    //set the destination
    destination: function(request, file, callback){
        callback(null, "public/assets");
    },
    filename: function(request, file, callback){
        callback(null, file.originalname);
    }
});
const upload = multer({ storage }); //help to save particular asset

//setup routs with files
app.post("/auth/register", upload.single("picture"), register);// in here register is what's the saving our user into our database and all the functionality relevent to register ,upload.single("picture") is midleware function that we can run before it hits that endpoint
//above route not in separate file because of it use upload variable that created in this file

//allow to users to upload the pictures
app.post("/posts", verifyToken, upload.single("picture"), createPost); //when send the picture from the frontend upload.single("picture") function will grab the picture property and upload it in to local

//routs
app.use("/auth", authRoutes);//get routes in separate file
app.use("/users", userRoutes);//create 3 routes under user routes in separate file
app.use("/posts", postRoutes);// post routes in separate file 
//setup MONGOOS
const PORT = process.env.PORT || 6000;
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //ADD DATA MANUALLY ONE TIME
    // User.insertMany(users);
    // Post.insertMany(posts);
})
.catch((error) => console.log(`${error} database did not connect`));