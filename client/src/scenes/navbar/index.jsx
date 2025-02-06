import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import{
    useTheme,
    useMediaQuery,
    Typography,
    IconButton,
    InputBase,
    FormControl,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Message,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { setMode, setLogout} from "state";

const Navbar = () => {
    //value to determine if want to open up the mobile menu when it's in small screen and can use this to toggle it on and off
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    //dispatch actions from the reducers
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //grab the user informations
    const user = useSelector((state) => state.user);
    //this is a hook built in to material UI that allows to determine if the current user screen size of the user is below this min width or highernthan min width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //allow the theme file
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    //access full name
    const fullName = `${user.firstName} ${user.lastName}`;
    //const fullName ="nayana";

    //FlexBetween is reuseble component
    //use css in the Box component
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            {/* this is logo section */}
            <FlexBetween gap="1.75rem">
                <Typography 
                    fontWeight="bold" 
                    fontSize="clamp(1rem, 2rem, 2.25rem)" 
                    color="primary" 
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                > 
                    Zingify
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight} 
                        borderRadius="9px" 
                        gap="3rem" 
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/*Desktop Navbar*/}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    {/* this is the button to change mode (dark mode or light mode)  use redux for this */}
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}}/>
                        ):(
                            <LightMode sx={{color: dark, fontSize: "25px"}}/>
                        )}
                    </IconButton>

                    {/*This for message icon in the Navbar*/}
                    <Message sx={{fontSize: "25px"}}/>

                    {/*This for notification icon in the Navbar*/}
                    <Notifications sx={{fontSize: "25px"}}/>

                    <Help sx={{fontSize: "25px"}}/>

                    {/*This for drop down at the top right where can see user that is logged in and logout button*/}
                    <FormControl variant="standard" value={fullName}>
                        <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "auto",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select: focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Logout
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu/>
                </IconButton>
            )}

            {/* Mobile Navebar */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}>
                    {/* Close Icon */}
                    <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <FlexBetween display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3rem">
                        <IconButton 
                        onClick={() => dispatch(setMode())}
                        sx={{fontSize: "25px"}}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{fontSize: "25px"}}/>
                            ):(
                                <LightMode sx={{color: dark, fontSize: "25px"}}/>
                            )}
                        </IconButton>
                        <Message sx={{fontSize: "25px"}}/>
                        <Notifications sx={{fontSize: "25px"}}/>
                        <Help sx={{fontSize: "25px"}}/>
                        <FormControl>
                            <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select: focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase/>}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Logout
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>               
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;