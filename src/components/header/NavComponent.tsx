import straw from "../../assets/straw.svg";
import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import map from "../../assets/globus.svg";

export default function NavComponent() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login')
    }
    const navigateToRegistration = () => {
        navigate('/registration')
    }
    const navigateToMain = () => {
        navigate('/')
    }
    const navigateToAboutUs = () => {
        navigate('/aboutUs')
    }
    const navigateToAddList = () => {
        navigate('/addList')
    }
    const navigateToMyLists = () => {
        navigate('/myListings')
    }

    const navigateToAccSettings = () => {

    }

    const navigateToHelp = () => {
    }

    const logOut = () => {

    }

    return (
        <Box display='flex' alignItems='baseline'>
            <Image alignSelf="center" boxSize='25px' src={straw} alt={straw}/>
            <Box pl={3} alignSelf="center">
                <Text onClick={() => navigateToMain()} cursor="pointer"
                      fontSize="25px" fontWeight={900} textTransform="uppercase" color='#FF2D55'>
                    foodShare
                </Text>
            </Box>
            <InputGroup   alignSelf="center" w={"50%"} ml={"6%"} alignItems={"center"}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300'/>}
                />
                <Input focusBorderColor='#FF2D55' type='search' placeholder='What are we in search of today?'/>
            </InputGroup>
            <Box onClick={() => navigateToAboutUs()} cursor="pointer" fontSize='22px' textAlign="center"
                 _hover={{color: "#FF2D55"}}
                 fontWeight="400"
                 alignSelf="center" w="40%"
                 color='#303030'>
                About Us
            </Box>
            <Box alignSelf="center" p={0} color='#303030'>
                <Menu>
                    <MenuButton _expanded={{bg: 'gray.100', color: "#FF2D55"}}
                                _hover={{bg: 'gray.100', color: "#FF2D55"}} variant="styled" as={Button}
                                rightIcon={<ChevronDownIcon/>}>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <Box fontWeight={400} fontSize='22px' alignSelf="center" w='30%' color='#303030'>
                Filters
            </Box>
            <Image mr="5%" alignSelf="center" src={map} alt={map}/>
            <Box alignSelf="center" p={0} color='#303030'>
                <Menu>
                    <MenuButton cursor="pointer" _expanded={{bg: '#FF2D55'}} variant="styled"
                                boxSize='40px' as={Avatar}>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => navigateToLogin()}>login</MenuItem>
                        <MenuItem onClick={() => navigateToRegistration()}>Registration</MenuItem>
                        <MenuItem onClick={() => navigateToAddList()}>Add list</MenuItem>
                        <MenuItem onClick={() => navigateToMyLists()}>My listing's</MenuItem>
                        <MenuItem onClick={() => navigateToAccSettings()}>Account settings</MenuItem>
                        <MenuItem onClick={() => navigateToHelp()}>Help</MenuItem>
                        <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            {/*<Avatar alignSelf="center" boxSize='40px' ml="5%" src='https://bit.ly/broken-link'/>*/}
            <Box pl={5} fontSize='22px' textAlign="center" fontWeight="400" alignSelf="center">name</Box>
        </Box>
    );
}