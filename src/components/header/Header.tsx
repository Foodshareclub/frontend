import React, {useEffect, useState} from 'react';
import {CardHeader, useColorModeValue} from "@chakra-ui/react";
import {getValueFromDBTC} from "@/store/slices/userReducer";
import {useActionCreators, useAppSelector} from "@/hook";
import {FilterProductComponent, NavComponent} from "@/components";
import {isAuthSelector, isUpdateProfileSelector, userIdFromSessionSelector} from "@/store/slices/userSelectors";
import AlertComponent from "@/components/alert/AlertComponent";

type HeaderType = {
    getRoute: (route: string) => void
    setProductType: (type: string) => void
    productType: string
}

export type PagesType = 'productComponent' | 'profileSettings';

const Header: React.FC<HeaderType> = ({getRoute, setProductType, productType}) => {

    const [pageType, setPageType] = useState<PagesType>("productComponent");
    const isAuth = useAppSelector(isAuthSelector);
    const userId = useAppSelector(userIdFromSessionSelector);
    const isUpdateProfile = useAppSelector(isUpdateProfileSelector)
    const actions = useActionCreators({getValueFromDBTC})
    useEffect(() => {
        if (userId && isAuth) {
            const values = {
                fromTableName: "profiles",
                columnValue: 'id',
                columnValueItem: userId,
                selectRow: "*"
            }
            actions.getValueFromDBTC(values);
        }
    }, [userId, isAuth, isUpdateProfile])
    console.log(isUpdateProfile)
    return (
        <CardHeader
            //borderBottom={"1px solid 'gray.200"}
            borderBottomWidth={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            w="100%" position="fixed" zIndex={2} pb={0}
            bg={useColorModeValue('white', 'gray.900')}
        >
            <NavComponent
                isAuth={isAuth}
                setPageType={setPageType}
                setProductType={setProductType}

            />
            <FilterProductComponent
                getRoute={getRoute}
                setPageType={setPageType}
                pageType={pageType}
                productType={productType}
            />
            <AlertComponent status={isUpdateProfile} title={"something"}/>
        </CardHeader>
    );
};

export default Header;