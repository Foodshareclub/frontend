import React from 'react';
import {Card, CardBody, CardFooter, Heading, IconButton, Image, Text, useDisclosure} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {Trans} from "@lingui/macro";
import {DeleteIcon} from "@chakra-ui/icons";
import {InitialProductStateType} from "@/api/productAPI";
import {PublishListingModal} from "@/components";



type AsideProdType = {
    img: string
    name: string,
    about: string,
    available: string
    distance: string
    height?: string
    product?: InitialProductStateType
    deleteProductHandler?: (productID: number) => void
}
const AsideProducts: React.FC<AsideProdType> = ({
                                                    product,
                                                    img,
                                                    name,
                                                    about,
                                                    available,
                                                    distance,

                                                    deleteProductHandler
                                                }) => {
    const url = useLocation().pathname;
    const {isOpen, onOpen, onClose} = useDisclosure();
    const navigate = useNavigate();

    const goToProduct = () => {
        navigate(`/one-product/${product?.post_type}/${product?.id}`);
    }

    const deleteHandler = () => {
        if (deleteProductHandler) {
            deleteProductHandler(product?.id as number);
        }
    }

    return (
        <Card
            direction={{base: 'column', lg: 'row'}}
            overflow='hidden'
            variant='outline'
            mt={4}
            mx={2}
            cursor="pointer"
            border="1px solid teal.50"
        >

            <Image
                rounded={'md'}
                objectFit={'cover'}
                borderRadius="5%"
                p={2}
                height={150}
                src={img}
                alt="profile img"
                onClick={goToProduct}
            />


            <CardBody alignSelf={"center"} onClick={goToProduct}>
                <Heading textAlign={"center"} noOfLines={1} fontSize={'2xl'} fontFamily={'body'}
                         fontWeight={500}>{name}</Heading>
                <Text textAlign={"center"} noOfLines={1} color={'gray.500'} fontSize={'sm'}
                      textTransform={'uppercase'}>{about}</Text>
            </CardBody>
            {
                url === '/user-listings' && <CardFooter alignSelf={"center"}>
                    {/*<Flex alignSelf={"center"} m={"0 auto"} justify={"space-around"} w="30%">*/}
                    <PublishListingModal isOpen={isOpen} onClose={onClose}

                                         product={product}/>
                    <IconButton
                        ml={4}
                        onClick={deleteHandler}
                        variant='outline'
                        icon={<DeleteIcon/>}
                        aria-label="delete">
                        <Trans>Delete</Trans>
                    </IconButton>
                    {/*</Flex>*/}
                </CardFooter>

            }
        </Card>
    );
};

export default AsideProducts;