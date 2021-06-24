import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import { FaGoogle } from "react-icons/fa";

import { useAuth } from "src/hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "src/services/firebase";
import {
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Input,
  useColorMode,
  LightMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ToggleTheme } from "src/components/ToggleTheme";
import { Logo } from "src/components/Logo";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  async function handleGoogleButton() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

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
        <Flex
          flexDirection={"column"}
          justify={"center"}
          px={"5rem"}
          pb={"5rem"}
        >
          {!isMobile && (
            <Image
              src={illustrationImg}
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
            Crie salas de Q&amp;A ao-vivo
          </Heading>
          <Text
            fontSize={"1.5rem"}
            lineHeight={"2rem"}
            mt={"1rem"}
            color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
          >
            Tire as dúvidas da sua audiência em tempo-real
          </Text>
        </Flex>
      </Flex>
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
              Crie sua sala com o Google
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
            ou entre em uma sala
          </Flex>
          <form onSubmit={handleJoinRoom}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
              bg={colorMode === "light" ? "white" : "black"}
              color={
                colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"
              }
              h={"3.125rem"}
              borderRadius={"0.5rem"}
              p={"0 1rem"}
              border={"1px solid"}
              w={"100%"}
            />
            <Button type="submit" variant={"app"} w={"100%"} mt={"1rem"}>
              Entrar na sala
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
