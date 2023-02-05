import {
    Button,
    FormControl,
    FormLabel,
    Input,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {ChangeEvent, useLayoutEffect, useState} from "react";
import {Trans} from "@lingui/macro";
import {useActionCreators, useAppSelector} from "@/hook";
import {updateProfileTC, uploadImgToDBTC, userActions} from "@/store/slices/userReducer";
import {AllValuesType} from "@/api/profileAPI";
import {Avatar} from "@/components";
import {isLoadingSelector} from "@/store/slices/userSelectors";


type ModalType = {
    buttonValue?: string
    fullScreen: boolean
}

const UpdateProfileModal: React.FC<ModalType> = ({buttonValue, fullScreen}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const actions = useActionCreators({...userActions, updateProfileTC, uploadImgToDBTC});

    const {user} = useAppSelector(state => state.user.session);
    const value = useAppSelector<AllValuesType>(state => state.user.value);
    const isLoading = useAppSelector<boolean>(isLoadingSelector);

    useLayoutEffect(() => {
        setFirstName(value.first_name)
        setAddress(value.user_address)
        setSecondName(value.second_name)
        setAbout(value.about_me)
        setAvatarUrl(value.avatar_url)
    }, [value]);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [filePath, setFilePath] = useState('');
    const [file, setFile] = useState<File>({} as File);
const [avatarUrl,setAvatarUrl]=useState<string>('')
    const [firstName, setFirstName] = useState<string>("");
    const [secondName, setSecondName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    // let randomNumber = Math.floor(Math.random() * new Date().getTime());
    const profileImgUrl = `https://iazmjdjwnkilycbjwpzp.supabase.co/storage/v1/object/public/avatars/${user.id}/${filePath}`

    const onUpload = (filePath: string, file: File) => {
        setFilePath(filePath);
        setFile(file);
    }
    const changeFirstName = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value);
    const changeSecondName = (e: ChangeEvent<HTMLInputElement>) => setSecondName(e.currentTarget.value);
    const changeAbout = (e: ChangeEvent<HTMLTextAreaElement>) => setAbout(e.currentTarget.value);
    const changeUserAddress = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.currentTarget.value);

    let defaultValues = {
        liked_post: value.liked_post,
        about_me: about,
        avatar_url: profileImgUrl,
        birth_date: value.birth_date,
        first_name: firstName,
        phone_number: value.phone_number,
        second_name: secondName,
        updated_at: new Date(),
        user_address: address,
        user_location: value.user_location,
        user_metro_station: value.user_metro_station,
        username: value.username,
        created_time: user.created_at || value.created_time,
        email: user.email,
        id: user.id,
    }
    if (value && !filePath) {
        defaultValues = {...defaultValues, avatar_url: avatarUrl}
    }
    const onClick = async () => {
             await actions.updateProfileTC(defaultValues);
        if (filePath) {
            await actions.uploadImgToDBTC({dir: `avatars/${user.id}`, filePath, file});
        }
        setFilePath('');
        setFile({} as File);

        onClose();
    };

    return (
        <>
            {fullScreen ? <MenuItem onClick={onOpen}>{buttonValue}</MenuItem> :
                <Text cursor={"pointer"} _hover={{color: "red"}} fontSize='3xl' onClick={onOpen}>{buttonValue}</Text>
            }

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size={"xl"}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader><Trans>Welcome to Foodshare</Trans></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Avatar url={value.avatar_url} size={150}
                                onUpload={(filePath, file) => {
                                    onUpload(filePath, file)
                                }}/>

                        <FormControl mt={4}>
                            <FormLabel><Trans>About me</Trans></FormLabel>
                            <Textarea
                                onChange={(e) => {
                                    changeAbout(e)
                                }}
                                value={about || ''}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel><Trans>First name</Trans></FormLabel>
                            <Input mb={3}
                                   onChange={(e) => {
                                       changeFirstName(e)
                                   }}
                                   value={firstName}
                                   variant="filled"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel><Trans>Second Name</Trans></FormLabel>
                            <Input mb={3}
                                   onChange={(e) => {
                                       changeSecondName(e)
                                   }}
                                   variant="filled"
                                   value={secondName}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel><Trans>User Address</Trans></FormLabel>
                            <Input mb={3}
                                   onChange={(e) => {
                                       changeUserAddress(e)
                                   }}
                                   variant="filled"
                                   value={address}
                            />
                        </FormControl>

                        <Button onClick={onClick} fontSize={25} variant="solid" m="10% 0"
                                w="100%" alignSelf="center"
                                disabled={isLoading}>
                            Update
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateProfileModal