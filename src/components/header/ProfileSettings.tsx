import * as React from "react";
import {Avatar, Box, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";

import {Trans} from "@lingui/macro";
import {loginTC, registerTC} from "@/store/slices/userReducer";
import {ProfileSettingsProps} from "@/components/header/NavComponent";
import {AuthenticationUserModal} from "@/components";
import {memo} from "react";


const ProfileSettings: React.FC<ProfileSettingsProps> = memo(({
                                                                  signalOfNewMessage,
                                                                  navigateToMyLists,
                                                                  navigateToHelp,
                                                                  navigateToLogout,
                                                                  navigateToAccSettings,
                                                                  navigateToAboutUs,
                                                                  navigateToMyMessages,
                                                                  imgUrl,
                                                                  isAuth
                                                              }) => {

    return (
        <>
            <Box alignSelf="center" p={0} color='#303030'>
                <Menu>
                    {!signalOfNewMessage ? <MenuButton
                            cursor="pointer"
                            borderRadius="50%"
                            icon={<Avatar src={imgUrl}/>}
                            as={Avatar}
                            _after={{
                                content: '""',
                                w: 4,
                                h: 4,
                                bg: 'green.300',
                                border: '2px solid white',
                                rounded: 'full',
                                pos: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                        </MenuButton> :
                        <MenuButton
                            cursor="pointer"
                            borderRadius="50%"
                            icon={<Avatar src={imgUrl}/>}
                            as={Avatar}
                        >
                        </MenuButton>}
                    <MenuList>
                        {
                            isAuth
                                ? <>
                                    <MenuItem onClick={() => navigateToMyLists()}><Trans>My listing's</Trans></MenuItem>
                                    <MenuItem onClick={() => navigateToMyMessages()}><Trans>My messages</Trans></MenuItem>
                                    <MenuItem onClick={() => navigateToAccSettings()}><Trans>Account
                                        settings</Trans></MenuItem>
                                    <MenuItem onClick={() => navigateToLogout()}><Trans>Log Out</Trans></MenuItem>
                                </>
                                : <>
                                    <AuthenticationUserModal buttonValue="Login" thunk={loginTC} fullScreen/>
                                    <AuthenticationUserModal buttonValue="Registration" thunk={registerTC}
                                                             fullScreen/>

                                </>
                        }

                        <MenuItem onClick={() => navigateToHelp()}><Trans>Help</Trans></MenuItem>
                        <MenuItem onClick={() => navigateToAboutUs()}><Trans>About Foodshare</Trans></MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </>

    )
})
export default ProfileSettings