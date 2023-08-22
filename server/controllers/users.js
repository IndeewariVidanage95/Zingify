import User from "../models/User.js";

//create read functions that are  getUser and getUserFriends
export const getUser = async(request, response) => {
    try{
        //grab the id from the particular string
        const {id} = request.params;
        //we can user particular id to grab the information of the user that we need
        const user = await User.findById(id);
        //send back to the frontend after find the particular user information
        response.status(200).json(user); 
    }catch(e){
        response.status(404).json({message: e.message});
    }
};

export const getUserFriends = async (request, response) => {
    try{
        const {id} = request.params;
        const user = await User.findById(id);

        //grab the friends using multiple api calls to database so use Promise.all() function 
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        //format a proper way for the frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return{_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        //sent to this formatted data to the frontend
        response.status(200).json(formattedFriends);
    }catch(e){
        response.status(404).json({message: e.message});
    }
}

export const addRemoveFriend = async(request, response) =>{
    try{
        const {id, friendId} = request.params;
        const user = await User.findById(id);//grab the current user as well all the information
        const friend = await User.findById(friendId);

        //if the friendId included in the main user's friend's id we want to make sure they are removed or
        //if the friend id is already part of the main user's friends list we want them to be removed
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            //if friendId not included in the user's friend list add to the friend list
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        //save this updated list
        await user.save();
        await friend.save();

        //format to the frontend
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
                return{_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        response.status(200).json(formattedFriends);
    }catch(e){
        response.status(404).json({message: e.message});
    }
}