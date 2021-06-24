import {
  Button,
  Flex,
  Image,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import copyImg from "../../assets/images/copy.svg";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast({
      title: "Código copiado com sucesso.",
      status: "success",
      isClosable: true,
    });
  }

  return (
    <Button
      display={"flex"}
      h={"2.5rem"}
      borderRadius={"0.5rem"}
      overflow={"hidden"}
      bg={colorMode === "light" ? "blackAlpha.100" : "blackAlpha.900"}
      color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
      border={"1px solid"}
      borderColor={"primaryApp.500"}
      p={0}
      onClick={copyRoomCodeToClipboard}
      colorScheme={'primaryApp'}
      variant={'outline'}
    >
      <Flex
        bg={"primaryApp.500"}
        p={"0 0.75rem"}
        h={"100%"}
        justify={"center"}
        align={"center"}
      >
        <Image src={copyImg} alt="Copy room code" />
      </Flex>
      <Text
        display={"block"}
        alignSelf={"center"}
        flex={1}
        p={"0 1rem 0 0.75rem"}
        minW={"14.375rem"}
        fontSize={"0.875rem"}
        fontWeight={500}
      >
        Sala #{props.code}
      </Text>
    </Button>
  );
}
