import {FC, memo} from "react";
import {Avatar, Box, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {ProfileSettingsProps} from "@/components/header/NavComponent";
import {AuthenticationUserModal} from "@/components";
import {loginTC, registerTC} from "@/store";


const ProfileSettings: FC<ProfileSettingsProps> = memo(({
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
                    {
                        signalOfNewMessage.length
                            ? <MenuButton
                                cursor="pointer"
                                borderRadius="50%"
                                height={'42px'}
                                width={'42px'}

                                icon={<Avatar height={'42px'} width={'42px'} src={imgUrl}/>}
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
                            />
                            : <MenuButton
                                cursor="pointer"
                                borderRadius="50%"
                                icon={<Avatar src={imgUrl}/>}
                                as={Avatar}
                            />
                    }
                    <MenuList>
                        {
                            isAuth
                                ? <>
                                    <MenuItem onClick={() => navigateToMyLists()}><Trans>My listing's</Trans></MenuItem>
                                    <MenuItem onClick={() => navigateToMyMessages()}>
                                        {signalOfNewMessage.length ?
                                            <Trans>You have {signalOfNewMessage.length} unanswered messages</Trans> :
                                            <Trans>My messages</Trans>}
                                    </MenuItem>
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