import Post from "../models/Post.js";
import User from "../models/User.js";

//create function
//this is handle the function that created on the index.js file
//this will have image getting passed through to the middleware
export const createPost = async (request, response) => {
    try{
        const {userId, description, picturePath} = request.body;//this is all that the frontend is going to send us
        const user =  await User.findById(userId);
        //create new post for database
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        //save in to the database
        await newPost.save();

        //not grabbing above created post, it grab the all posts and send to the frontend
        const post = await Post.find();
        response.status(201).json(post);
    }catch(e){
        response.status(409).json({message: e.message});
    }
}

//read functions
//this function is going to grab all the posts of everyone
//it's represent the news feed for the user
export const getFeedPosts = async (request, response) => {
    try{
        //get all user posts 
        const post = await Post.find();
        //and send posts to the frontend
        response.status(200).json(post);
    }catch(e){
        response.status(404).json({message: e.message});
    }
}

//get posts that related to a particular user
export const getUserPosts = async (request, response) => {
    try{
        const {userId} = request.params;
        const post = await Post.find({userId});
        response.status(200).json(post);
    }catch(e){
        response.status(404).json({message: e.message});
    }
}

//update function
export const likePost = async (request, response) => {
    try{
        //grab the relevant post, this id comes from the query string
        const {id} = request.params;
        //this userId comes from the body
        const {userId} = request.body;
        //grabbing the post information
        const post = await Post.findById(id);
        //grabbing whether user has liked or not
        //check the likes that is the userId exist, is userId exist that means the post has been liked by that Showing results for particular person
        const isLiked = post.likes.get(userId);

        if(isLiked){
            //delete if it already exists 
            post.likes.delete(userId);
        }else{
            //set it if it doesn't exist
            post.likes.set(userId, true);
        }

        //update particular post in the frontend
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        response.status(200).json(updatedPost);
    }catch(e){
        response.status(404).json({message: e.message});
    }
};