import {
  Flex,
  useColorMode,
  Link,
  Heading,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaRegTimesCircle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "src/components/Logo";
import { ToggleTheme } from "src/components/ToggleTheme";

export function Unauthorized() {
  const { colorMode } = useColorMode();
  return (
    <Flex minH={"100vh"} direction={"column"}>
      <Flex
        as={"header"}
        p={"1.5rem"}
        px={{ lg: "10rem" }}
        borderBottom={"1px solid"}
        borderColor={
          colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
        }
        justify={"space-between"}
        align={"center"}
        direction={{ base: "column", md: "row" }}
        gridGap={"0.5rem"}
      >
        <Flex alignSelf={"center"}>
          <Link as={RouterLink} to="/">
            <Logo style={{ maxHeight: "2.875rem" }} />
          </Link>
        </Flex>
        <Flex gridGap={"0.5rem"}>
          <ToggleTheme />
        </Flex>
      </Flex>
      <Flex
        as={"main"}
        justify={"center"}
        align={"center"}
        flex={1}
        gridGap={"1rem"}
        direction={"column"}
      >
        <Icon as={FaRegTimesCircle} color={"danger.500"} boxSize={"7rem"} />
        <Heading fontSize={"6xl"} color={"danger.500"}>
          Oops!
        </Heading>
        <Text color={"gray.500"}>
          Parece que você não tem permissão para acessar essa página.
        </Text>
        <Text color={"gray.500"}>
          <Button
            variant={"link"}
            colorScheme={"primaryApp"}
            as={RouterLink}
            to={"/"}
          >
            Clique aqui
          </Button>{" "}
          para entrar em outra sala.
        </Text>
      </Flex>
    </Flex>
  );
}
