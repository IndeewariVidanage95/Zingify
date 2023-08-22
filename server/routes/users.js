import express from "express";
//import controllers
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//create read routes to grab information 
router.get("/:id", verifyToken, getUser); //grab the id from frontend and call our database with the particular id
router.get("/:id/friends", verifyToken, getUserFriends);

//update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;