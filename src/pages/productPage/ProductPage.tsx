import React from 'react';
import styles from "./productPage.module.scss";
import likes from "../../assets/likes.svg";
import loc from "../../assets/location-blue.svg";
import {useLocation} from "react-router-dom";
import {Box, Button, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {asideProdProperty, property} from "../../utils/mockArray";
import AsideProducts from "./asideProducts/AsideProducts";
import PickUpRequestModal from "../../components/modals/PickUpRequestModal";

const ProductPage = () => {
    const {photo} = useLocation().state;

    return (
        <div className={styles.root}>
            <Flex justify="center">
                <Box w="50%" alignSelf="center">
                    <Image
                        src={photo}
                        borderRadius={20}
                        alt={photo}
                        boxSize='90%'
                        objectFit='cover'
                    />
                </Box>

                <Box alignSelf="center" w="40%">
                    <Box lineHeight={2}>
                        <Flex>
                            <Heading alignSelf="center" size='md'>{property.name}</Heading>
                            <Image pl={4} src={loc} alt={loc}/>
                            <Text px={2}>{property.distance}</Text>
                        </Flex>
                        <Flex>
                            <Image src={likes} alt={likes}/>
                            <Text px={2}>{property.numbLikes}</Text>
                        </Flex>
                        <Flex mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < property.rating ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {property.reviews} reviews
                            </Box>
                        </Flex>
                        <Text  lineHeight={1.5}>{property.about}</Text>
                        <Heading alignSelf="center" size='md'>Pick Up Address</Heading>
                        <Text>{property.pickUpAddress}</Text>
                        <Flex>
                            <Heading alignSelf="center" size='md'>Available:</Heading>
                            <Text px={2}>{property.available}</Text>
                        </Flex>
                        <Flex>
                            <Heading alignSelf="center" size='md'>Quantity:</Heading>
                            <Text px={2}>{property.quantity}</Text>
                        </Flex>
                        <Heading alignSelf="center" size='md'>Food Type</Heading>
                        <Text>{property.type}</Text>
                    </Box>

                    <Box mt={10}>
                        <PickUpRequestModal/>
                    </Box>
                </Box>
            </Flex>

            <Flex pt={10} justify={"center"}>
                <Box borderRadius={10} alignSelf={"start"} w={"50%"}>
                    <Box fontWeight={700} fontSize={20} pb={6}>
                        Location:
                    </Box>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2417628.5557509!2d27.986708999999998!3d53.718878999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1671868201476!5m2!1sru!2sby"
                        width="90%" height="620" style={{border: "0", borderRadius: "10px"}} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Box>
                <Box w={"40%"}>
                    <Box fontWeight={700} fontSize={20} pb={2}>
                        You May Also Like:
                    </Box>
                    {asideProdProperty.map((el, id) => (
                        <AsideProducts
                            key={id}
                            img={el.img} name={el.name} about={el.about}
                            available={el.available} distance={el.distance}/>
                    ))}

                </Box>
            </Flex>
        </div>
    );
};

export default ProductPage;