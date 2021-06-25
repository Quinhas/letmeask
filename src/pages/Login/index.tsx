import { useHistory } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";

import { useAuth } from "src/hooks/useAuth";
import { Flex, Button, useColorMode, LightMode } from "@chakra-ui/react";
import { Logo } from "src/components/Logo";
import { Aside } from "src/components/Aside";
import { LoginForm } from "src/components/LoginForm";

export function Login() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { colorMode } = useColorMode();

  async function handleGoogleButton() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/");
  }

  return (
    <Flex
      align={"stretch"}
      h={"100vh"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Aside />
      <Flex flex={8} m={"2rem"} align={"center"} justify={"center"}>
        <Flex
          className="main-content"
          direction={"column"}
          w={"100%"}
          maxW={"21rem"}
          align={"stretch"}
          textAlign={"center"}
        >
          <Flex alignSelf={"center"}>
            <Logo />
          </Flex>
          <LightMode>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme={"google"}
              onClick={handleGoogleButton}
              mt={"2rem"}
              h={"3.125rem"}
              fontWeight={500}
            >
              Faça login com o Google
            </Button>
          </LightMode>
          <Flex
            fontSize={"0.875rem"}
            color={colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"}
            margin={"2rem 0"}
            align={"center"}
            _before={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${
                colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"
              }`,
              marginRight: "1rem",
            }}
            _after={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${
                colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"
              }`,
              marginLeft: "1rem",
            }}
          >
            ou
          </Flex>
          <LoginForm />
        </Flex>
      </Flex>
    </Flex>
  );
}
