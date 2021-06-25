import { useHistory } from "react-router-dom";

import { FaDoorOpen, FaPlus } from "react-icons/fa";

import { FormEvent, useState } from "react";
import { database } from "src/services/firebase";
import { Flex, Button, Input, useColorMode, LightMode } from "@chakra-ui/react";
import { Logo } from "src/components/Logo";
import { Aside } from "src/components/Aside";
import { Link as RouterLink } from "react-router-dom";

export function JoinRoom() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const { colorMode } = useColorMode();

  async function handleJoinRoom(ev: FormEvent) {
    ev.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().closedAt) {
      alert("Room already closed");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <Flex
      align={"stretch"}
      minH={"100vh"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Aside
        heading={"Toda pergunta tem uma resposta."}
        text={"Aprenda e compartilhe conhecimento com outras pessoas"}
      />
      <Flex
        flex={8}
        mx={"2rem"}
        my={"1rem"}
        align={"center"}
        justify={"center"}
      >
        <Flex
          className="main-content"
          direction={"column"}
          w={"100%"}
          maxW={"21rem"}
          align={"stretch"}
          textAlign={"center"}
        >
          <Flex alignSelf={"center"} as={RouterLink} to="/">
            <Logo />
          </Flex>
          <LightMode>
            <Button
              leftIcon={<FaPlus />}
              colorScheme={"secondaryApp"}
              onClick={() => history.push("/rooms/new")}
              mt={"2rem"}
              h={"3.125rem"}
              fontWeight={500}
            >
              Crie sua sala
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
            <Button
              leftIcon={<FaDoorOpen />}
              type="submit"
              variant={"app"}
              w={"100%"}
              mt={"1rem"}
              disabled={!roomCode}
            >
              Entrar na sala
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
