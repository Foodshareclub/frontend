import React from 'react';
import {Box, Grid, GridItem, Image, Link, SimpleGrid} from "@chakra-ui/react";
import kitchen from "../../assets/Foodies Soup Kitchen.png";
import PersonCard from "../personCard/PersonCard";
import {teamMockArray} from "../../utils/mockArray";
import leftImg from "../../assets/leftImg.png";
import centerTop from "../../assets/centerTop.png";
import centerBottom from "../../assets/centerBott.png";
import rightImg from "../../assets/rightImg.png";
import company from "../../assets/AvoAcademy.png";
import {ArrowForwardIcon} from "@chakra-ui/icons";
// colorScheme='teal'

const AboutUsPage = () => {

    return (
        <>
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                <GridItem w='100%' h='50vh'/>
                <GridItem borderRadius={"10%"} w='100%'>
                    <Image src={leftImg} alt={leftImg}/>
                </GridItem>
                <Grid gap={6}>
                    <GridItem borderRadius={"10%"} w='100%'>
                        <Image src={centerTop} alt={centerTop}/>
                    </GridItem>
                    <GridItem borderRadius={"10%"} w='100%'>
                        <Image src={centerBottom} alt={centerBottom}/>
                    </GridItem>
                </Grid>
                <GridItem borderRadius={"10%"} w='100%'>
                    <Image src={rightImg} alt={rightImg}/>
                </GridItem>
                <GridItem w='100%' h='50vh'/>
            </Grid>
            <Grid pt={6} templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem w='100%'>
                    <Box borderRadius={5} bgColor={"red.100"} fontWeight={600} fontSize={40} w="100%"
                         textAlign="center">About Us</Box>
                    <Image w="55%" m="0 auto" alignItems="center" src={kitchen} alt={kitchen}/>
                </GridItem>
                <GridItem fontSize="24px" w='100%'>
                    <Box>Foodshare was born in 2022 when with a small team three teammates. Tarlan decided to organise a
                        foodsharing project with a simple and easy to use cross-platform mobile app.
                    </Box>
                    <Box pt={2}>The app allows everyone to post food items that may not be needed in your fridge for one
                        reason
                        or another, and other participants, users can pick them up for free. This also includes the
                        use-by date on or before food from local shops, vegetables or bread from the bakery. Thus
                        benefactors get satisfaction from helping to needy with the reduction of waste from life and
                        deprived persons gratuitous receipt of food with the possibility to choose.
                    </Box>
                    <Box pt={2}>Thus benefactors get satisfaction from helping to needy with the reduction of waste from
                        life
                        and deprived persons gratuitous receipt of food with the possibility to choose.
                    </Box>
                </GridItem>
            </Grid>
            <Box borderRadius={5} bgColor={"red.100"} mt={10} mb={10} fontWeight={600} fontSize={40}
                 textAlign="center">Team</Box>
            <SimpleGrid columns={2} spacing={3}>
                {teamMockArray.map((el, id) => <PersonCard
                        about={el.about}
                        name={el.name}
                        exp={el.exp}
                        img={el.img}
                        key={id}
                    />
                )}
            </SimpleGrid>
            <Box fontWeight={600} fontSize={40} w="100%" textAlign="center">Design Tribute</Box>
            <Grid pt={6} pb={6} fontSize={24} fontWeight={400} templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem w='100%'>
                    <Image m="0 auto" src={company} alt={company}/>
                </GridItem>
                <GridItem w='100%'>
                    <Box>
                        An educational platform that helps people change careers into the UX/UI design field through an
                        affordable and short curriculum. Website: https://www.Avocademy.com
                    </Box>
                    <Box pt={6}>
                        Thank you very much their awesome team that has helped Foodshare to build a beautiful UI/UX
                        design :)
                    </Box>
                </GridItem>
            </Grid>
            <Box _hover={{bg: 'red.100'}} fontSize={25} textAlign="end" mt={5}>
                <Link href='/contactUs'>
                    Contact Us... <ArrowForwardIcon mx={2}/>
                </Link>
            </Box>
        </>

    );
};

export default AboutUsPage;