//widget for all posts that added in the home page
//post widget do 2 things
//1. on the home page it is going to grab all user all the posts from anybody and thats going to be API call regarding "outer.get("/", verifyToken, getFeedPosts);"
//2. and get user only posts.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    //get all post
    const getPosts = async() => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token} `},
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    };

    //get only user posts
    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token} `},
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    };

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }else {
            getPosts();
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {posts.toReversed().map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />    
                    
                )
            )}
        </>
    )
}
export default PostsWidget;