import React, {useEffect} from 'react';
import {Box, Button, Flex, Heading, SimpleGrid, useDisclosure} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {Navigate} from "react-router-dom";
import {useActionCreators, useAppSelector} from "@/hook";
import {AlertComponent, ListingPersonCards, ProductCard, PublishListingModal, SkeletonCard} from "@/components";
import {
    currentUserProductsSelector,
    deleteProductTC,
    getCurrentUserProductsTC,
    isAuthSelector,
    isUpdateProductSelector,
    messageProductSelector,
    productActions,
    productStatusSelector,
    updateProductEffectSelector,
    userIdFromSessionSelector
} from "@/store";


const MyListingsPage = () => {
    const actions = useActionCreators({getCurrentUserProductsTC, deleteProductTC, ...productActions});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const userId = useAppSelector(userIdFromSessionSelector);
    const isUpdateProduct = useAppSelector(isUpdateProductSelector);
    const updateProductEffect = useAppSelector(updateProductEffectSelector);
    const currentUserProducts = useAppSelector(currentUserProductsSelector);
    const publishedProducts = currentUserProducts.filter(product => product.active);
    const isAuth = useAppSelector(isAuthSelector);
    const productMessage = useAppSelector(messageProductSelector);
    const status = useAppSelector(productStatusSelector);
    const loaded = status === "loaded";


    useEffect(() => {
        if (userId) {
            actions.getCurrentUserProductsTC(userId);
        }
        return () => {
            actions.clearOneProductState();
        }
    }, [actions, updateProductEffect, userId]);

    if (!isAuth) {
        return <Navigate to='/'/>
    }
    return (
        <Box mt="17vh" mb={"9vh"}>
            <AlertComponent
                status={isUpdateProduct}
                title={productMessage}
                top={"94%"}
            />

            <Flex direction={"column"} justify="space-between">
                <Box>
                    <ListingPersonCards>
                        <Flex justify={"center"} pt={5}>
                            <Button w={"30%"} onClick={() => onOpen()}
                                    background={"#ff2d55"}
                                    _hover={{bg: '#c92040'}}
                                    color="#ffffff"
                                    variant="solid"
                            >
                                <Trans>Add Listing</Trans>
                            </Button>
                            <PublishListingModal onClose={onClose} isOpen={isOpen}/>
                        </Flex>

                    </ListingPersonCards>
                </Box>

                <Heading my={6} textAlign={"center"}>
                    <Trans>Active Listings</Trans>
                </Heading>

                <SimpleGrid px={{xl: 20, base: 7}}
                            columns={{lg: 4, md: 3, "ss": 2, base: 1}}
                            spacing={10}>
                    {!loaded ?
                        [...Array(4)].map((item, i) => (
                            <SkeletonCard key={i} isLoaded={false}/>
                        ))
                        :
                        publishedProducts.length > 0
                        && publishedProducts.map((item, id) => (
                            <ProductCard
                                product={item}
                                key={id}
                            />
                        ))}
                </SimpleGrid>
            </Flex>
        </Box>

    );
};

export default MyListingsPage;