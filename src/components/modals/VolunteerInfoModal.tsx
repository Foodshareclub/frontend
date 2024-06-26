import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {useState} from "react";
import {Trans} from "@lingui/macro";

function VolunteerInfoModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    let [value, setValue] = useState('');

    let handleInputChange = (value: React.SetStateAction<string>) => setValue(value);

    return (
        <>
            <Button alignItems={"center"} mt={6} fontSize="22px"
                    w={{md: "50%", base: "100%"}} color="#ffffff"
                    background={"#ff2d55"}
                    _hover={{bg: '#c92040'}}
                    onClick={onOpen}
            ><Trans>Get Started</Trans></Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>

                <ModalContent>
                    <ModalHeader>
                        Enter Volunteer Info
                    </ModalHeader>

                    <ModalCloseButton/>

                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>
                                Full Name
                            </FormLabel>

                            <Input ref={initialRef} placeholder='Full Name'/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>
                                Email Address
                            </FormLabel>
                            <Input placeholder='Email Address'/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>
                                Phone Number
                            </FormLabel>
                            <Input placeholder='Phone Number'/>
                        </FormControl>

                        <Flex>
                            <FormControl mt={4}>
                                <FormLabel>
                                    Vehicle Make
                                </FormLabel>
                                <Input placeholder='Honda'/>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>
                                    Vehicle Model
                                </FormLabel>
                                <Input placeholder='Civic'/>
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>
                                Vehicle Model
                            </FormLabel>

                            <Textarea
                                value={value}
                                onChange={(e) => handleInputChange(e.currentTarget.value)}
                                placeholder='Enter...'
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button w="100%" onClick={onClose} colorScheme='red'>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default VolunteerInfoModal