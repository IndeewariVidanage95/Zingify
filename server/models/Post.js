import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            //required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,

        //use map bcz when we add a like can add map or unlike can remove map 
        likes: {
            type: Map,
            of: Boolean,
        },
        Comment: {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;