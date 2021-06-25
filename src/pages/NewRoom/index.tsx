import { Link as RouterLink, useHistory } from "react-router-dom";

import { useAuth } from "src/hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "src/services/firebase";
import {
  Button,
  Flex,
  Heading,
  Text,
  Input,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { Logo } from "src/components/Logo";
import { Aside } from "src/components/Aside";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const [creatingRoom, setIsCreatingRoom] = useState(false);
  const { colorMode } = useColorMode();

  async function handleCreateRoom(ev: FormEvent) {
    ev.preventDefault();
    setIsCreatingRoom(true);

    if (newRoom.trim() === "") {
      return;
    }

    try {
      const roomRef = database.ref("rooms");
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      });

      history.push(`/admin/rooms/${firebaseRoom.key}`);
    } catch (error) {
      setIsCreatingRoom(false);
    }
  }

  return (
    <Flex
      align={"stretch"}
      h={"100vh"}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Aside
        heading={"Toda pergunta tem uma resposta."}
        text={"Aprenda e compartilhe conhecimento com outras pessoas"}
      />
      <Flex flex={8} m={"0 2rem"} align={"center"} justify={"center"}>
        <Flex
          w={"100%"}
          maxW={"21rem"}
          flexDirection={"column"}
          align={"stretch"}
          textAlign={"center"}
        >
          <Flex alignSelf={"center"} as={RouterLink} to="/">
            <Logo />
          </Flex>
          <Heading
            fontSize={"1.5rem"}
            margin={"2rem"}
            color={colorMode === "light" ? "blackAlpha.900" : "whiteAlpha.900"}
          >
            Crie uma nova sala
          </Heading>
          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              name="roomName"
              placeholder="Nome da Sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
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
              type="submit"
              variant={"app"}
              w={"100%"}
              mt={"1rem"}
              isLoading={creatingRoom}
              disabled={!newRoom}
            >
              Criar sala
            </Button>
          </form>
          <Text
            fontSize={"0.875rem"}
            color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
            mt={"1rem"}
          >
            Quer entrar em uma sala já existente?{" "}
            <Link as={RouterLink} to="/rooms/join" color={"secondaryApp.500"}>
              Clique aqui
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
