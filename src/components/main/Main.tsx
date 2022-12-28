import React from 'react';
import {mockArray} from "../../utils/mockArray";
import {useNavigate} from "react-router-dom";
import {Box, GridItem, Image, Link, SimpleGrid} from "@chakra-ui/react";
import navIcon from '../../assets/map.svg';
import soup from '../../assets/soup.svg';
import {ArrowForwardIcon} from "@chakra-ui/icons";
import useMediaQuery from '../../utils/useMediaQuery';

export default function Main() {
    const isLargeThan700 = useMediaQuery('(min-width:700px)')
    const isLargeThan500 = useMediaQuery('(min-width:500px)')

        //console.log(isLargeThan700)
    const navigate = useNavigate();
    return (<Box>
            <SimpleGrid columns={!isLargeThan500?1: !isLargeThan700 ? 2 : 4} spacing={10}>
                {mockArray.map((item, id) => (
                    <GridItem mt='2' mb='2' key={id}>
                        <Image width="100%" cursor="pointer" borderRadius="10px"
                               onClick={() => navigate("/oneProd", {state: {photo: item.img}})} src={item.img}
                               alt="soup"/>
                        <div>
                            <Box display='flex' alignItems='baseline' fontSize={25}>
                                <Box noOfLines={1} mt='2' fontWeight={700}>{item.name}</Box>
                                <Image ml="2" borderRadius='full' boxSize='20px' src={soup} alt={soup}/>
                            </Box>
                            <Box display='flex' alignItems='baseline'>
                                <div style={{fontWeight: "700", fontSize: "16px"}}>Distance:</div>
                                <Box mt='1' ml="2" fontWeight='normal' as='h4' lineHeight='tight' noOfLines={1}
                                >
                                    {item.distance}
                                </Box>
                                <Image ml="2" borderRadius='full' boxSize='15px' src={navIcon} alt={navIcon}
                                />
                            </Box>
                            <Box display='flex' alignItems='baseline'>
                                <div style={{fontWeight: "700", fontSize: "16px"}}>Available:</div>
                                <Box mt='1' ml="2" fontWeight='normal' as='h4' lineHeight='tight' noOfLines={1}
                                >
                                    {item.available_time}
                                </Box>
                            </Box>

                            <Box display='flex' alignItems='baseline'>
                                <Box mt='1' fontWeight='normal' as='h4' lineHeight='tight' noOfLines={1}
                                >
                                    {item.description}
                                </Box>
                            </Box>
                        </div>
                    </GridItem>
                ))}

            </SimpleGrid>
            <Box _hover={{bg: 'red.100'}} fontSize={25} textAlign="center" mt={5}>
                <Link href='#'>
                    See more... <ArrowForwardIcon mx={2}/>
                </Link>
            </Box>
        </Box>
    );
}