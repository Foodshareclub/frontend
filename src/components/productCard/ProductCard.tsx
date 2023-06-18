import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Flex, GridItem, Heading, IconButton, Image, Text, useDisclosure} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useAppSelector} from "@/hook";
import {userIdFromSessionSelector} from "@/store";
import {DeleteCardModal, PublishListingModal} from "@/components";
import {InitialProductStateType} from "@/api/productAPI";
import bus from "@/assets/busIcon.png";

type ProductCardType = {
    product: InitialProductStateType
}

export const ProductCard: React.FC<ProductCardType> = React.memo(({product}) => {

    const navigate = useNavigate();
    const userId = useAppSelector(userIdFromSessionSelector)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [openEdit, setOpenEdit] = useState(false);
    const onNavigateToOneProductHandler = () => navigate(`/one-product/${product.post_type}/${product.id}`);

    return (
        <GridItem>
            <Box position={"relative"}>
                {
                    userId === product.profile_id &&
                    <Flex w={'100%'} top={2} right={2} alignItems={"end"} position={"absolute"} justify={"end"}>
                        <IconButton
                            backgroundColor={"snow"}
                            size={"sm"}
                            onClick={() => setOpenEdit(true)}
                            variant='outline'
                            icon={<EditIcon/>}
                            aria-label="update">
                        </IconButton>
                        <PublishListingModal
                            product={product} isOpen={openEdit} onClose={onClose} setOpenEdit={setOpenEdit}/>
                        <IconButton
                            backgroundColor={"snow"}
                            size={"sm"}
                            ml={4}
                            onClick={onOpen}
                            variant='outline'
                            icon={<DeleteIcon/>}
                            aria-label="delete">
                            <Trans>Delete</Trans>
                        </IconButton>
                        <DeleteCardModal product={product} onClose={onClose} isOpen={isOpen}/>
                    </Flex>

                }
                <Image
                    rounded={'lg'}
                    objectFit={'cover'}
                    width="100%"
                    height={250}
                    cursor="pointer"
                    borderRadius="10px"
                    onClick={onNavigateToOneProductHandler}
                    src={product.gif_url}
                    alt="broken image"
                />
            </Box>

            <Box mt={3}>

                {/*<Flex justify="center" align="center" fontSize={25}>*/}
                <Heading noOfLines={1} fontSize={'xl'} fontFamily={'body'} textAlign={'left'}
                         fontWeight={500}>
                    {product.post_name}
                </Heading>
                {/*</Flex>*/}
                <Flex pt={3} alignItems="center" alignSelf="center">
                    {/*<Text mt='1' color={'gray.500'} fontSize={'sm'}*/}
                    {/*      textTransform={'uppercase'}>*/}
                    {/*    <Trans>Distance:</Trans>*/}
                    {/*</Text>*/}
                    <Text mt='1' noOfLines={1} color={'black'} fontSize={'sm'}>
                        {product.post_address}
                    </Text>
                </Flex>
                <Flex>
                    <Text mt='1' color={'gray.500'} fontSize={'sm'}
                    ><Trans>Available:</Trans></Text>
                    <Text mt='1' ml="2" noOfLines={1} color={'black'} fontSize={'sm'}>
                        {product.pickup_time}
                    </Text>
                </Flex>
                <Flex gap={'5px'}>
                    <Image mt={1} width={5} src={bus} alt={'bus'}/>
                    <Text alignSelf={"center"} color={'black'} fontSize={'sm'}
                    >{product.transportation}</Text>
                </Flex>
            </Box>
        </GridItem>
    )
})