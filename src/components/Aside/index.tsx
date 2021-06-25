import {
  Flex,
  Heading,
  Text,
  Image,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ToggleTheme } from "../ToggleTheme";
import illustrationImg from "../../assets/images/illustration.svg";

type AsideProps = {
  heading?: string;
  text?: string;
  image?: string;
};

export function Aside({
  heading = "Crie salas de Q&A ao-vivo",
  text = "Tire as dúvidas da sua audiência em tempo-real",
  image = illustrationImg,
}: AsideProps) {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      flex={7}
      direction={"column"}
      justify={"space-between"}
      bg={"primaryApp.500"}
      color={"white"}
      gridGap={"2rem"}
    >
      <Flex px={"5rem"} pt={"2rem"}>
        <ToggleTheme />
      </Flex>
      <Flex flexDirection={"column"} justify={"center"} px={"5rem"} pb={"5rem"}>
        {!isMobile && (
          <Image
            src={image}
            maxW={"20rem"}
            alt="Ilustração simbolizando perguntas e respostas"
          />
        )}
        <Heading
          fontWeight="700"
          fontSize={"2.5rem"}
          lineHeight={"2.625rem"}
          mt={"1rem"}
          color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
        >
          {heading}
        </Heading>
        <Text
          fontSize={"1.5rem"}
          lineHeight={"2rem"}
          mt={"1rem"}
          color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
