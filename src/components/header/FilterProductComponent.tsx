import * as React from 'react';
import {useState} from 'react';
import {navigationActionsSVG} from "../../utils/navigationActions";
import {Flex} from "@chakra-ui/react";
import "../../index.scss";
import Carousel from "../carousel/Carousel";
import {PagesType} from "./Header";


export type ValueType = {
    name: string
    src: string
    red: string
}

type SimpleBottomNavigationType = {
    pageType: PagesType
    setPageType: (pageType: PagesType) => void
    getRoute: (route: string) => void
    productType: string
}

const SimpleBottomNavigation: React.FC<SimpleBottomNavigationType> = ({
                                                                          getRoute,
                                                                          pageType,
                                                                          setPageType,
                                                                          productType
                                                                      }) => {

    return <Flex p={4} px={0} justify="space-around">
        <Carousel
            getRoute={getRoute}
            setPageType={setPageType}
            pageType={pageType}
            productType={productType}
        />
    </Flex>
}
export default SimpleBottomNavigation