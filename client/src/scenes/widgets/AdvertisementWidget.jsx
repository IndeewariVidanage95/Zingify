import { Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"

const AdvertisementWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                    color={dark}
                    variant="h5"
                    fontWeight="500"
                >
                    Sponsored
                </Typography>
                <Typography
                    color={medium}
                >
                    Create Add
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/doggy.jpeg"
                style={{
                    borderRadius:"0.75rem",
                    margin:"0.75rem 0"
                }}
            />
            <FlexBetween>
                <Typography color={main}>Doggy Mart</Typography>
                <Typography color={medium}>doggymart.com</Typography>
            </FlexBetween>
            <Typography color={medium} margin="0.5rem 0">
            When considering a pet food it is important to note that superiority should not be measured on the 
            format of the food but rather its content.
            </Typography>
        </WidgetWrapper>
    );
};
export default AdvertisementWidget;