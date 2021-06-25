import { useHistory } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";

import { useAuth } from "src/hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "src/services/firebase";
import {
  Flex,
  Button,
  Input,
  useColorMode,
  LightMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  OtherProps,
} from "@chakra-ui/react";
import { Logo } from "src/components/Logo";
import { Aside } from "src/components/Aside";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import { LoginForm } from "src/components/LoginForm";

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const { colorMode } = useColorMode();

  async function handleGoogleButton() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/");
  }

  async function handleLoginWithEmail(
    values: { email: string },
    actions: FormikHelpers<FormValues>
  ) {}

  async function handleJoinRoom(ev: FormEvent) {
    ev.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    console.log(roomRef);
    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().closedAt) {
      alert("Room already closed");
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <Flex
      align={"stretch"}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
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
              mt={"4rem"}
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
