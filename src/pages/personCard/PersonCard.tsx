import React from 'react';
import {Card, CardBody, Heading, Image, Skeleton, Stack, Text} from "@chakra-ui/react";
import PublishListingModal from "../../components/modals/PublishListingModal";
import {useLocation} from "react-router-dom";

type PropsType = {
    name: string
    secondName: string
    img: string
    exp: string
    aboutExp?: string
    aboutMe?: string
    userID: string
}

const PersonCard: React.FC<PropsType> = ({
                                             name,
                                             secondName,
                                             img,
                                             exp,
                                             aboutExp,
                                             aboutMe,
                                             userID
                                         }) => {
    const url = useLocation();
    return (
        <Card
            direction={{base: 'column', lg: 'row'}}
            overflow='hidden'
            variant='filled'
            mt={4} mb={4}
        >
            <Skeleton borderRadius="50%"
                      m={2}
                      isLoaded={true}>
                <Image m={"0 auto"}
                       rounded={'md'}
                       objectFit={'cover'}
                       alignSelf="center"
                       borderRadius="50%"
                       p={4}
                       maxW={{base: '100%', sm: '200px'}}
                       src={img}
                       alt={img}
                />
            </Skeleton>

            <Stack alignSelf={"center"}>
                <CardBody>
                    <Heading textAlign={"center"} size='md'>
                        {name} {secondName}
                    </Heading>

                    <Heading textAlign={"center"} size='md'>
                        {exp}
                    </Heading>

                    {url.pathname === '/user-listings'
                        ? <>
                            <Text textAlign={"center"} py='2'>
                                {aboutMe}
                            </Text>
                            <PublishListingModal userID={userID}/>
                        </>
                        : <Text py='2'>
                            {aboutExp}
                        </Text>
                    }

                </CardBody>
            </Stack>
        </Card>
    );
};

export default PersonCard;