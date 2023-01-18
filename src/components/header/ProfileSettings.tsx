import * as React from "react";
import map from "../../assets/globus.svg"
import {Avatar, Box, Menu, MenuButton, MenuItem, MenuList,Image} from "@chakra-ui/react";
import UpdateProfileModal from "../modals/UpdateProfileModal";

import {ProfileSettingsProps} from "./NavComponent";
import {loginTC, registerTC} from "../../store/slices/userReducer";
import AuthenticationUserModal from "../modals/AuthenticationUser/AuthenticationUserModal";

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
                                                             navigateToMyLists,
                                                             navigateToHelp,
                                                             navigateToLogout,
                                                             navigateToAccSettings,
                                                             navigateToAboutUs,
                                                             imgUrl, isRegister
                                                         }) => {
    return (
        <>
            <Image mr="5%" alignSelf="center" src={map} alt={map}/>
            <Box alignSelf="center" p={0} color='#303030'>
                <Menu>
                    <MenuButton
                        cursor="pointer"
                        borderRadius="50%"
                        icon={<Avatar src={imgUrl}/>}
                        as={Avatar}>
                    </MenuButton>
                    <MenuList>
                        {
                            isRegister
                                ? <>
                                    <UpdateProfileModal buttonValue="Update Profile"/>
                                    <MenuItem onClick={() => navigateToMyLists()}>My listing's</MenuItem>
                                    <MenuItem onClick={() => navigateToLogout()}>Log Out</MenuItem>
                                </>
                                : <>
                                    <AuthenticationUserModal buttonValue="Login" thunk={loginTC}/>
                                    <AuthenticationUserModal buttonValue="Registration" thunk={registerTC}/>

                                </>
                        }
                        <MenuItem onClick={() => navigateToAccSettings()}>Account settings</MenuItem>
                        <MenuItem onClick={() => navigateToHelp()}>Help</MenuItem>
                        <MenuItem onClick={() => navigateToAboutUs()}>About Foodshare</MenuItem>

                    </MenuList>
                </Menu>
            </Box>
        </>
    )
}
export default ProfileSettings