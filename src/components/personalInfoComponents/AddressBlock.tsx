import React, {useState} from "react";
import {Box, Button, Flex, Heading, Input, Text} from "@chakra-ui/react";

type AddressBlockType = {
    onSaveHandler: () => void
    a: boolean
    b: boolean
    c: boolean
    d: boolean
    setA: (value: boolean) => void
    setB: (value: boolean) => void
    setC: (value: boolean) => void
}

export const AddressBlock: React.FC<AddressBlockType> = ({onSaveHandler, a, b, c, d, setC, setA, setB}) => {
    const [edit, setEdit] = useState(false);

    const [uCountry, setCountry] = useState('');
    const [uStreet, setStreet] = useState('');
    const [uFlat, setFlat] = useState('');
    const [uCity, setCity] = useState('');
    const [uRegion, setRegion] = useState('');
    const [uPostcode, setPostcode] = useState('');

    const addressObject = {
        country: uCountry,
        street: uStreet,
        flat: uFlat,
        city: uCity,
        region: uRegion,
        postcode: uPostcode
    };


    return (
        <Flex>
            <Box width={"container.lg"}>
                <Heading color={d ? "gray.100" : "gray.500"} textAlign='left'>
                    Address
                </Heading>
                {
                    edit
                        ? <>
                            <Input
                                placeholder={'Country/region'}
                                value={uCountry}
                                onChange={(e) => setCountry(e.currentTarget.value)}
                            />
                            <Input
                                placeholder={'Street address'}
                                value={uStreet}
                                onChange={(e) => setStreet(e.currentTarget.value)}
                            />
                            <Input
                                placeholder={'Flat, suit'}
                                value={uFlat}
                                onChange={(e) => setFlat(e.currentTarget.value)}
                            />
                            <Flex justifyContent={"space-between"}>
                                <Input
                                    placeholder={'City'}
                                    value={uCity}
                                    onChange={(e) => setCity(e.currentTarget.value)}
                                />
                                <Input
                                    placeholder={'State/ Province/ Country/ Region'}
                                    value={uRegion}
                                    onChange={(e) => setRegion(e.currentTarget.value)}
                                />
                            </Flex>
                            <Input
                                placeholder={'Postcode'}
                                value={uPostcode}
                                onChange={(e) => setPostcode(e.currentTarget.value)}
                            />
                            <Button
                                onClick={onSaveHandler}
                                colorScheme={"blackAlpha"}
                                variant={"solid"}
                                mt={3}
                            >Save
                            </Button>
                        </>
                        : <Text color={d ? "gray.100" : "gray.500"}>
                            Use a permanent address where you can receive mail.
                        </Text>
                }
            </Box>
            <Button
                disabled={d}
                onClick={() => {
                    setA(!a)
                    setB(!b)
                    setC(!c)
                    setEdit(!edit)
                }}
                cursor={"pointer"}
            >
                {edit ? 'Cancel' : 'Edit'}
            </Button>
        </Flex>

    );

}