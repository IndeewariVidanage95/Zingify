//widget that have user details in home page 
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    PetsOutlined,
    EmailOutlined,
    FacebookOutlined
  } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath}) => {
    const [user, setUser] = useState(null);    //grab user from the backend
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);//grab token from the store
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    //call to api to grab the logged user information
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setUser(data);
    };

    //invoke getUser
    //when you enter this page, render this component 
    useEffect(() => {
        getUser();
    },[]); //eslint-disable-line react-hooks/exhaustive-deps

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* First Row */}
            <FlexBetween
                gap="0.5rem"
                paddingBottom="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage 
                        image={picturePath}
                    />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box> 
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>
            <Divider/>

            {/* Second Row */}
            <Box padding="1rem 0">
                <Box 
                    display="flex"
                    alignItems= "center"
                    gap="1rem"
                    marginBottom="0.5rem"
                >
                    <LocationOnOutlined
                        fontSize="large"
                        sx={{ 
                            color: main 
                        }}
                    />
                    <Typography color={medium}>
                        {location}
                    </Typography>
                </Box>
                <Box 
                    display="flex"
                    alignItems= "center"
                    gap="1rem"
                    mb="0.5rem"
                >
                    <PetsOutlined
                        fontSize="large"
                        sx={{ 
                            color: main 
                        }}
                    />
                    <Typography color={medium}>
                        {occupation}
                    </Typography>
                </Box>
            </Box>
            <Divider/>

            {/* Third Row */}
            <Box padding="1rem 0">
                <FlexBetween marginBottom="0.5rem">
                    <Typography color={medium}>
                        Who is viewed your profile
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>
                       Impression of your post
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>
            <Divider/>
            
            {/* Fourth Row */}
            <Box padding="1rem 0">
                <Typography
                    fontSize="1rem"
                    color={main}
                    fontWeight="500"
                    mb="1rem"
                >
                    Owner's Details 
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <EmailOutlined
                            fontSize="large"
                            sx={{ 
                                color: main 
                            }}
                        />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Email
                            </Typography>
                            <Typography color={medium}>
                                Contact
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined 
                        sx={{
                            color: main
                        }}
                    />
                </FlexBetween>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <FacebookOutlined
                            fontSize="large"
                            sx={{ 
                                color: main 
                            }}
                        />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Facebook
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined 
                        sx={{
                            color: main
                        }}
                    />
                </FlexBetween>
            </Box>  
        </WidgetWrapper>
    )
};

export default UserWidget;

