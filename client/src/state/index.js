import { createSlice } from "@reduxjs/toolkit";

//setup initial state
//this is state that stored in global state so this data can access throughout our entire app from anywhere 
//so we don't have to pass in state and properties down to different components
const initialState = {
    //this is all auth information we are going to store
    mode: "light", //represent light mode and dark mode it configure in globally 
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //this includes actions / think as functions that involve modifying the global state (that's the different than regular function)
    reducers: {
        //changing light mode to dark mode 
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            //if the user already exist
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.log("User friends not exist..!")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;