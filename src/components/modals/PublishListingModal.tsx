import React, {useRef, useState} from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Select,
    Text,
    Textarea
} from "@chakra-ui/react";
import {createPhotoUrl} from "@/utils";
import cloud from "../../assets/cloud.svg"
import {useActionCreators, useAppSelector} from "@/hook";
import {t, Trans} from '@lingui/macro';
import {RequiredStar} from "@/components";
import {
    createProductTC,
    productActions,
    updateProductTC,
    uploadPostImgToDBTC,
    userActions,
    userIdFromSessionSelector,
    userLocationSelector
} from "@/store";
import {InitialProductStateType} from "@/api/productAPI";

type PublishListingModalType = {
    product?: InitialProductStateType
    onClose: () => void
    isOpen: boolean
    setOpenEdit?: (value: boolean) => void
    value?: string
}

const PublishListingModal: React.FC<PublishListingModalType> = React.memo(({
                                                                               product,
                                                                               isOpen,
                                                                               onClose, setOpenEdit, value
                                                                           }) => {
    const id = useAppSelector(userIdFromSessionSelector);
    const userLocation = useAppSelector(userLocationSelector)
    const actions = useActionCreators({
        ...productActions, ...userActions,
        createProductTC,
        updateProductTC,
        uploadPostImgToDBTC
    })
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [imgUrl, setImgUrl] = useState<string>(product?.gif_url || '');
    const [category, setCategory] = useState(product?.post_type || '');
    const [title, setTitle] = useState(product?.post_name || '');
    const [description, setDescription] = useState(product?.post_description || '');
    const [time, setTime] = useState(product?.pickup_time || '');
    const [address, setAddress] = useState(product?.post_address || '');
    const [metroStation, setMetroStation] = useState(product?.transportation || '');
    const [productId, setProductId] = useState(product?.id || 0);
    const [filePath, setFilePath] = useState('')
    const [file, setFile] = useState<File>({} as File)


    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const img = createPhotoUrl(event);
        setImgUrl(img.url);//  get photo URL
        setFile(img.file)
        setFilePath(img.filePath)
    }
    const postImgUrl = `https://iazmjdjwnkilycbjwpzp.supabase.co/storage/v1/object/public/avatars-posts/${id}/${filePath}`


    let productObj: Partial<InitialProductStateType> = {
        gif_url: postImgUrl,
        post_type: category,
        post_name: title,
        post_description: description,
        pickup_time: time,
        post_address: address,
        transportation: metroStation,
        profile_id: id,
        locations: userLocation
    }
    // let productObj = {
    //     gif_url: postImgUrl,
    //     post_type: category,
    //     post_name: title,
    //     post_description: description,
    //     pickup_time: time,
    //     post_address: address,
    //     post_metro_station: metroStation,
    //     user: id,
    //     locations: userLocation
    // }

    if (product && !filePath) {
        productObj = {...productObj, gif_url: product.gif_url}
    }

    const publishHandler = async () => {

        await actions.uploadPostImgToDBTC({
            dir: `avatars-posts/${id}`, file, filePath
        });//если дубль фото то в сторадже не создаст новую

        if (product) {
            await actions.updateProductTC({...productObj, id: productId, active: true});
        } else await actions.createProductTC(productObj);
        if (onClose) {
            onClose();
        }
        if (setOpenEdit) {
            setOpenEdit(false)
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose()
                if (setOpenEdit) {
                    setOpenEdit(false)
                }
            }}

            size="xl"
        >
            <ModalOverlay/>

            <ModalContent>
                <ModalCloseButton/>

                <ModalBody pb={6}>
                    <FormControl mt={10}>
                        <Flex _hover={{bg: 'gray.50'}} justify="space-between" p={4} border="1px dashed #2D9CDB"
                              borderRadius={10}>
                            {
                                imgUrl
                                    ? <img style={{maxWidth: "50%", borderRadius: "10px", margin: '0 auto'}}
                                           src={imgUrl}
                                           alt={imgUrl}
                                    />
                                    : <>
                                        <Box alignSelf={"center"}>
                                            <Image borderRadius='full'
                                                   boxSize='50px' src={cloud}/>
                                        </Box>
                                        <Box>
                                            <Text><Trans>Select a file or drag and drop here</Trans></Text>
                                            <Text> <Trans>JPG or PNG file size no more than 10MB</Trans></Text>
                                        </Box>
                                    </>
                            }

                            <Box alignSelf="center">
                                <Input opacity={0} position="absolute" h="100%" left={0} top={0}
                                       accept="image/png, image/jpeg, image/webp" ref={inputFileRef} type="file"
                                       onChange={(e) => handleChangeFile(e)}/>

                                <Button onClick={() => inputFileRef?.current?.click()} background={"#ff2d55"}
                                        _hover={{bg: '#c92040'}}
                                        color="#ffffff">
                                    <Trans>Download</Trans>
                                </Button>
                            </Box>
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>
                            <Trans>Category</Trans>
                            <RequiredStar/>
                        </FormLabel>
                        <Select variant='outline' defaultValue={value}
                                placeholder={t({
                                    id: `Select category`,
                                    message: `Select category`
                                })}
                                onChange={(e) => setCategory(e.currentTarget.value)}
                        >
                            <option value='food'><Trans>Food</Trans></option>
                            <option value='things'><Trans>Things</Trans></option>
                            <option value='borrow'><Trans>Borrow</Trans></option>
                            <option value='wanted'><Trans>Wanted</Trans></option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>
                            <Trans>Title</Trans>
                            <RequiredStar/>
                        </FormLabel>
                        <Input
                            style={{textTransform: 'capitalize'}}
                            required={true}
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}/// handler
                            placeholder={t({
                                id: `What is it called`,
                                message: `What is it called`
                            })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>
                            <Trans>Description</Trans>
                            <RequiredStar/>
                        </FormLabel>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            placeholder={t({
                                id: `A few words about...`,
                                message: `A few words about...`
                            })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel><Trans>Time</Trans></FormLabel>
                        <Input
                            value={time}
                            onChange={(e) => setTime(e.currentTarget.value)}
                            placeholder={t({
                                id: `When you will be ready to give`,
                                message: `When you will be ready to give`
                            })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel><Trans>Address</Trans></FormLabel>
                        <Input
                            style={{textTransform: 'capitalize'}}
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            placeholder={t({
                                id: `Where you will be`,
                                message: `Where you will be`
                            })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel><Trans>Metro Station</Trans></FormLabel>
                        <Input
                            value={metroStation}
                            onChange={(e) => setMetroStation(e.currentTarget.value)}
                            placeholder={t({
                                id: `Nearest station`,
                                message: `Nearest station`
                            })}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        w="100%"
                        onClick={() => publishHandler()}
                        colorScheme='red'
                        isLoading={!category || !title || !description || !imgUrl}
                    >
                        <Trans>Publish Listing</Trans>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
})

export default PublishListingModal;