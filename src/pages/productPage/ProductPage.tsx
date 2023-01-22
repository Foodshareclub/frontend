import React, {useEffect} from 'react';
import styles from "./productPage.module.scss";
import likes from "../../assets/likes.svg";
import loc from "../../assets/location-blue.svg";
import {useLocation} from "react-router-dom";
import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import AsideProducts from "./asideProducts/AsideProducts";
import PickUpRequestModal from "../../components/modals/PickUpRequestModal";
import {useAppDispatch, useAppSelector} from "../../hook/hooks";
import {getRandomProducts} from "../../utils/getRandomProduct";
import {getProductTC} from "../../store/slices/productReducer";
import { Trans } from '@lingui/macro';

type ProductPageType = {
    obj?: any
    buttonValue?: string
}

const ProductPage: React.FC<ProductPageType> = ({obj, buttonValue}) => {
    const dispatch = useAppDispatch();

    const item = useLocation().state;

    const products = useAppSelector(state => state.product.products);

    useEffect(() => {
        dispatch(getProductTC(item.post_type))
    }, []);


    return (
        <div className={styles.root}>
            <Flex justify="center">
                <Box w="50%" alignSelf="center">
                    <Image
                        src={item.gif_url}
                        borderRadius={20}
                        alt={item.post_name}

                        m={"0 auto"}
                        maxWidth={300}

                        objectFit='cover'

                    />
                </Box>

                <Box alignSelf="" w="40%">
                    <Box lineHeight={2}>
                        <Flex>
                            <Heading alignSelf="center" size='md'>{item.post_name}</Heading>
                            <Image pl={4} src={loc} alt={loc} />
                            <Text px={2}>{item.post_address}</Text>
                        </Flex>

                        <Flex>
                            <Image src={likes} alt={likes}/>
                            <Text px={2}>{item.post_like_counter}</Text>
                        </Flex>

                        <Flex mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < 4 ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                <Trans>999 reviews</Trans>
                            </Box>
                        </Flex>

                        <Text lineHeight={1.5}>{
                            item.post_description}
                        </Text>

                        <Heading alignSelf="center" size='md'><Trans>Pick Up Address</Trans></Heading>

                        <Text>{item.post_address}</Text>

                        <Flex>
                            <Heading alignSelf="center" size='md'><Trans>Available:</Trans></Heading>
                            <Text px={2}>{item.pickup_time}</Text>
                        </Flex>

                        <Flex>
                            <Heading alignSelf="center" size='md'><Trans>Quantity:</Trans></Heading>
                            <Text px={2}>{item.post_description}</Text>
                        </Flex>

                        <Heading alignSelf="center" size='md'><Trans>Food Type</Trans></Heading>
                        <Text>{item.post_type}</Text>
                    </Box>

                    <Box mt={10}>
                        <PickUpRequestModal buttonValue={buttonValue}/>
                    </Box>
                </Box>
            </Flex>

            <Flex pt={10} justify={"center"}>
                <Box borderRadius={10} alignSelf={"start"} w={"50%"}>
                    <Box fontWeight={700} fontSize={20} pb={6}>
                        <Trans>Location:</Trans>
                    </Box>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2417628.5557509!2d27.986708999999998!3d53.718878999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1671868201476!5m2!1sru!2sby"
                        width="90%" height="500" style={{border: "0", borderRadius: "10px"}} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Box>

                <Box w={"40%"}>
                    <Box fontWeight={700} fontSize={20} pb={2}>
                        <Trans>Available:</Trans>You May Also Like:
                    </Box>

                    {products.length && getRandomProducts(products, item).map((product, id) => (//data - 3 random elem from array
                        <AsideProducts
                            key={id}
                            product={product}
                            img={product.gif_url}
                            name={product.post_name}
                            about={product.post_name}
                            available={product.pickup_time}
                            distance={product.post_address}
                        />
                    ))}

                </Box>
            </Flex>
        </div>
    );
};

export default ProductPage;