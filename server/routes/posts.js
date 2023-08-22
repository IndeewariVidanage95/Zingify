import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//setup read rouse

//grab the user feed when we are on the home page(ex: show all posts in the database on your profile)
router.get("/", verifyToken, getFeedPosts);
//to grab relevant users post only(ex: when click on the user's name you can only can see particular user's post only)
router.get("/:userId/posts", verifyToken, getUserPosts);

//setup update route
//from this  can like and unlike to the posts
router.patch("/:id/like", verifyToken, likePost);

export default router;