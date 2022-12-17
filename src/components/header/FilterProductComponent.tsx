import * as React from 'react';
import food from "../../assets/food.svg";
import things from "../../assets/things.svg";
import borrow from "../../assets/borrow.svg";
import wanted from "../../assets/wanted.svg";
import foodBanks from "../../assets/foodBanks.svg";
import fridges from "../../assets/fridges.svg";
import business from "../../assets/business.svg";
import volunteer from "../../assets/volunteer.svg";
import challenges from "../../assets/challenges.svg";
import community from "../../assets/community.svg";
import map from "../../assets/map.svg";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{width: "auto" , height:"50%"}}>
            <BottomNavigation
                sx={{paddingTop:"2%"}}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Food" icon={<img src={food} alt={food}/>}/>
                <BottomNavigationAction label="Things" icon={<img src={things} alt={things}/>}/>
                <BottomNavigationAction label="Borrow" icon={<img src={borrow} alt={borrow}/>}/>
                <BottomNavigationAction label="Wanted" icon={<img src={wanted} alt={wanted}/>}/>
                <BottomNavigationAction label="FoodBanks" icon={<img src={foodBanks} alt={foodBanks}/>}/>
                <BottomNavigationAction label="Fridges" icon={<img src={fridges} alt={fridges}/>}/>
                <BottomNavigationAction label="Business" icon={<img src={business} alt={business}/>}/>
                <BottomNavigationAction label="Volunteer" icon={<img src={volunteer} alt={volunteer}/>}/>
                <BottomNavigationAction label="Challenges" icon={<img src={challenges} alt={challenges}/>}/>
                <BottomNavigationAction label="Community" icon={<img src={community} alt={community}/>}/>
                <BottomNavigationAction label="Map" icon={<img src={map} alt={map}/>}/>
            </BottomNavigation>
        </Box>
    );
}