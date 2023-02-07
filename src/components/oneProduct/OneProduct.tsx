import loc from "@/assets/location-blue.svg";
import likes from "@/assets/likes.svg";
import {InitialProductStateType} from "@/store/slices/productReducer";
import {Box, Button, Flex, Heading, Image, Text} from "@chakra-ui/react";
import React from "react";
import {StarIcon} from "@chakra-ui/icons";
import TopTips from "@/components/topTips/TopTips";
import {Trans} from "@lingui/macro";
import {useNavigate} from "react-router-dom";

type OneProductType = {
    product: InitialProductStateType
    buttonValue?: string
    chat?:string
}

export const OneProduct: React.FC<OneProductType> = ({chat,product, buttonValue = "Request"}) => {
  const navigate = useNavigate()

    const navigateHandler = () => {
navigate(`/chat-main/${product.id}`)
    }
    return (
        <Box w={{md: "25%", base: "100%"}}>
            <Box alignSelf="center">
                <Image
                    src={product.gif_url}
                    borderRadius={20}
                    alt={product.post_name}
                    m={"0 auto"}
                    maxWidth={300}
                    height={{ss: "auto", base: "270px"}}
                />
            </Box>
            <Box>
                <Box lineHeight={2}>
                    <Heading textTransform={'uppercase'} pt={1}
                             textAlign={"center"} noOfLines={1} fontSize={'2xl'} fontFamily={'body'}
                             fontWeight={500}>{product.post_name}</Heading>

                    <Flex>
                        <Image src={loc} alt={loc}/>
                        <Text px={2} textAlign={"center"} noOfLines={1} color={'gray.500'}
                              textTransform={'uppercase'}>{product.post_address}</Text>
                    </Flex>
                    <Flex>
                        <Image src={likes} alt={likes}/>
                        <Text px={2} textAlign={"center"} noOfLines={1} color={'gray.500'} fontSize={'sm'}
                              textTransform={'uppercase'}>{product.post_like_counter}</Text>
                    </Flex>

                    <Flex justify={"center"}>
                        {Array(5)
                            .fill('')
                            .map((item, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < 4 ? 'teal.500' : 'gray.300'}
                                />
                            ))}
                    </Flex>
                    <Text textAlign={"center"} noOfLines={1} color={'gray.500'} fontSize={'sm'}
                          textTransform={'uppercase'}><Trans>{product.post_views} views</Trans></Text>
                    <Heading fontFamily={'body'} fontWeight={500} fontSize={'xl'}
                             alignSelf="center"><Trans>Available:</Trans></Heading>
                    <Text noOfLines={1} color={'gray.500'} fontSize={'sm'}
                          textTransform={'uppercase'}>{product.pickup_time}</Text>

                    <Heading fontFamily={'body'} fontWeight={500} fontSize={'xl'}><Trans>Quantity:</Trans></Heading>
                    <Text noOfLines={1} color={'gray.500'} fontSize={'sm'}
                          textTransform={'uppercase'}>{product.post_description}</Text>

                    <Heading fontFamily={'body'} fontWeight={500} fontSize={'xl'} alignSelf="center"
                             size='md'><Trans>Food Type:</Trans></Heading>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>{product.post_type}</Text>
                </Box>
                {chat && <TopTips/>}
                <Box>
                    <Button
                        onClick={navigateHandler}
                            backgroundColor='#FF2D55'
                            textTransform={"uppercase"}
                            width="100%" variant='solid'
                            colorScheme='blue'>
                        {buttonValue}
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}